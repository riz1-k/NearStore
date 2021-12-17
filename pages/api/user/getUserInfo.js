import connect from '@/database/connect';
import User from '@/database/models/userSchema';
import nc from 'next-connect';
import auth from '../verifyToken';

const handler = nc()
  .use(auth)
  .get(async (req, res) => {
    await connect();
    User.findById(req.user.id)
      .select('-password')
      .exec((err, user) => {
        if (err) {
          return res.status(400).json({ msg: 'id not found' });
        }
        return res.status(200).json({ user });
      });
  });

export default handler;
