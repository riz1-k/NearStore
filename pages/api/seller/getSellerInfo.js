import connect from '@/database/connect';
import Seller from '@/database/models/sellerSchema';
import nc from 'next-connect';
import verifytoken from '../verifyToken';

const handler = nc()
  .use(verifytoken)
  .get(async (req, res) => {
    await connect();
    Seller.findById(req.user.id)
      .select('-sellerPassword')
      .populate('sellerStore')
      .exec((err, seller) => {
        if (err) {
          return res.status(400).json({ msg: 'Admin ID not found' });
        }
        return res.status(200).json({ seller });
      });
  });

export default handler;
