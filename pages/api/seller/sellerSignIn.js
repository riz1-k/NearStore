import connect from '../../../database/connect';
import Seller from '../../../database/models/sellerSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { sellerEmail, sellerPassword } = req.body;

  //simple validation
  if ((!sellerEmail, !sellerPassword)) {
    return res.status(400).json({ msg: 'fill the required fields' });
  }

  //check for existing seller
  Seller.findOne({ sellerEmail }).then(seller => {
    if (!seller) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    //validate passwords
    bcrypt.compare(sellerPassword, seller.sellerPassword).then(isMatch => {
      if (!isMatch) return res.status(401).json({ msg: 'Incorrect Password' });

      jwt.sign(
        { id: seller.id },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            res.status(400).json({
              msg: 'All fields have not been entered',
            });
            throw err;
          }
          res.status(200).json({
            token,
            seller: {
              id: seller.id,
              sellername: seller.sellerName,
              email: seller.sellerEmail,
              phone: seller.sellerPhone,
              verified: seller.sellerVerified,
            },
            msg: 'Successfully signed in!',
          });
        }
      );
    });
  });
};
