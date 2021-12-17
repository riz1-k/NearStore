import connect from '@/database/connect';
import Admin from '@/database/models/adminSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { adminEmail, adminPassword, securecode } = req.body;

  //simple validation
  if ((!adminEmail, !adminPassword)) {
    return res.status(400).json({ msg: 'Fill the required fields' });
  }

  if (securecode !== process.env.ADMIN_SECURE_CODE) {
    return res.status(400).json({ msg: 'Wrong Secure Code' });
  }

  //check for existing admin
  Admin.findOne({ adminEmail }).then(admin => {
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    //validate passwords
    bcrypt.compare(adminPassword, admin.adminPassword).then(isMatch => {
      if (!isMatch) return res.status(401).json({ msg: 'Incorrect Password' });

      jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              msg: 'Error while generating a token',
            });
          }
          res.status(200).json({
            token,
            admin: {
              id: admin.id,
              adminname: admin.adminname,
              adminemail: admin.email,
            },
            msg: 'Successfully Logged In',
          });
        }
      );
    });
  });
};
