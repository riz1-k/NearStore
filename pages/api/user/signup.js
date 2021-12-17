import connect from '@/database/connect';
import User from '@/database/models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async (req, res) => {
  await connect();
  const { username, email, password } = req.body;
  let userId = '';
  let userEmail = '';

  if ((!username, !email, !password)) {
    return res.status(400).json({ msg: 'Fill the required fields' });
  }

  //check for existing user
  User.findOne({ email }).then(item => {
    if (item) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new User({ username, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          res.status(400).json({
            msg: 'Error while generating token',
          });
          throw err;
        }
        newUser.password = hash;
        newUser.save().then(user => {
          userId = user.id;
          userEmail = user.email;
          sendEmail(userEmail);
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
                msg: 'Account has been created successfully',
              });
            }
          );
        });
      });
    });
  });
  const emailToken = () =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: 1800 });
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
      to: email,
      subject: 'Email confirmation',
      html: `To verify your Email, Click: <a href='http://localhost:3000/useremailverify?token=${token}'>Verify </a> 
      <br/> This link is only valid for 30 minutes. <br/>Thank you`,
    };

    Transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log('Verifcation Email sent');
      }
    });
  };
};
