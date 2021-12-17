import connect from '@/database/connect';
import Admin from '@/database/models/adminSchema';
import nc from 'next-connect';
import verifytoken from '../verifyToken';

const handler = nc()
  .use(verifytoken)
  .get(async (req, res) => {
    await connect();
    Admin.findById(req.user.id)
      .select('-adminPassword')
      .exec((err, admin) => {
        if (err) {
          return res.status(400).json({ msg: 'id not found' });
        }
        return res.status(200).json({ admin });
      });
  });

export default handler;
