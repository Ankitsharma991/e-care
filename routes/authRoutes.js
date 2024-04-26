const express = require("express");
const User = require("../models/userModels");
const Verification = require("../models/verificationModels");
const router = express.Router();
const responseFunction = require("../utils/responseFunction");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const mailer = async (receiver_email, code) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.SMPT_MAIL,
    to: receiver_email,
    subject: "OTP for Shareify",
    text: "Your OTP is " + code,
    html: "<b>Your OTP is " + code + "</b>",
  });
  console.log("Message sent: %s", info.messageId);
};

router.get("/test", (req, res) => {
  mailer("ssakumar0311@gmail.com", 1234);
  res.json({
    message: "Auth route works",
  });
});

router.post("register", async (req, res, next) => {});
router.post("/sendotp", async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return responseFunction(res, 400, "Email is required", next);
  }
  try {
    const code = Math.floor(100000 + Math.random() * 900000);
    return responseFunction(res, 200, "OTP sent Successfully", code, true);
  } catch (err) {
    return responseFunction(res, 500, "Internal Server error", err, false);
  }
});

router.get("/", (req, res) => {
  res.json({
    message: "welcome to Shareify",
  });
});

router.get("/home", (req, res) => {
  res.json({
    message: "welcome to auth home page",
  });
});

module.exports = router;
