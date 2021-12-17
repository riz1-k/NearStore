import connect from '@/database/connect';
import Seller from '@/database/models/sellerSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async (req, res) => {
  await connect();
  const { sellerName, sellerEmail, sellerPassword, sellerPhone } = req.body;
  let sellerId = '';
  let selleremail = '';

  if ((!sellerName, !sellerEmail, !sellerPassword, !sellerPhone)) {
    return res.status(400).json({ msg: 'fill the required fields' });
  }

  //check for existing user
  Seller.findOne({ sellerEmail }).then(item => {
    if (item) {
      return res.status(400).json({ msg: 'Seller already exists' });
    }
    const newSeller = new Seller({
      sellerName,
      sellerEmail,
      sellerPassword,
      sellerPhone,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newSeller.sellerPassword, salt, (err, hash) => {
        if (err) throw err;
        newSeller.sellerPassword = hash;
        newSeller.save().then(seller => {
          sellerId = seller.id;
          selleremail = seller.sellerEmail;
          sendEmail(selleremail);
          jwt.sign(
            { id: seller.id },
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                seller: {
                  id: seller.id,
                  sellername: seller.sellerName,
                  selleremail: seller.sellerEmail,
                  sellerphone: seller.sellerPhone,
                  sellerverified: seller.sellerVerified,
                },
                msg: 'Seller created',
              });
            }
          );
        });
      });
    });
  });
  const emailToken = () =>
    jwt.sign({ id: sellerId }, process.env.JWT_SECRET, { expiresIn: 1800 });
  const sendEmail = async email => {
    const token = emailToken();
    var Transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MyEmail,
        pass: process.env.MyPassword,
      },
    });

    var mailOptions;
    let sender = process.env.MyName;
    mailOptions = {
      from: sender,
      to: selleremail,
      subject: 'Seller Email confirmation',
      html: `To verify your Email, Click: <a href='http://localhost:3000/selleremailverify?token=${token}'>Verify </a> 
      <br/> This link is only valid for 30 minutes. <br/>Thank you`,
    };

    Transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('Verification email Sent!');
      }
    });
  };
};
