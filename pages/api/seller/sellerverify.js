import Seller from '@/database/models/sellerSchema';
import connect from '@/database/connect';
import { decode } from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { token } = req.query;
  const sellerid = decode(token).id;
  const seller = await Seller.findOne({ _id: sellerid });
  if (seller) {
    seller.sellerVerified = true;
    await seller.save();
    return res.json(res.status(200).json({ msg: 'Seller Email verified' }));
  } else {
    return res.json(res.status(400).json({ msg: 'Seller doesn not exist' }));
  }
};
