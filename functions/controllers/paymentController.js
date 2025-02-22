import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import crypto from "crypto";
import shortid from "shortid";

const razorpay = new Razorpay({
  key_id: "rzp_test_fF62bDmx4cqklg",
  key_secret: "WffXVbsaZFNln6vHFnk4YGqq",
});
const verify = asyncHandler(async (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

const Payment = asyncHandler(async (req, res) => {
  const payment_capture = 1
	const {amount} = req.body;
	const currency = 'INR'
 
  console.log(req.body);

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
});

export { verify, Payment };
