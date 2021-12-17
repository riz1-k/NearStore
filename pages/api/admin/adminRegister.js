import connect from '@/database/connect';
import Admin from '@/database/models/adminSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { adminName, adminEmail, adminPassword, securecode } = req.body;

  if ((!adminName, !adminEmail, !adminPassword, !securecode)) {
    return res.status(400).json({ msg: 'Fill the required fields' });
  }

  if (securecode !== process.env.ADMIN_SECURE_CODE) {
    return res.status(400).json({ msg: 'Wrong Secure Code' });
  }

  //check for existing admin
  Admin.findOne({ adminEmail }).then(item => {
    if (item) {
      return res.status(400).json({ msg: 'Admin Email already exists' });
    }

    const newAdmin = new Admin({ adminName, adminEmail, adminPassword });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.adminPassword, salt, (err, hash) => {
        if (err) {
          res.status(400).json({
            msg: 'Error while generating token',
          });
          console.log(err);
        }
        newAdmin.adminPassword = hash;
        newAdmin.save().then(admin => {
          jwt.sign(
            { id: admin.id },
            process.env.JWT_SECRET,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                admin: {
                  id: admin.id,
                  username: admin.adminName,
                  email: admin.adminEmail,
                },
                msg: 'Admin Account has been created successfully',
              });
            }
          );
        });
      });
    });
  });
};
