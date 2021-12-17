import User from '@/database/models/userSchema';
import connect from '@/database/connect';
import { decode } from 'jsonwebtoken';

export default async (req, res) => {
  await connect();
  const { token } = req.query;
  const userid = decode(token).id;
  const user = await User.findOne({ _id: userid });
  if (user) {
    user.isVerified = true;
    await user.save();
    return res.json(res.status(200).json({ msg: 'User Email verified' }));
  } else {
    return res.json(res.status(400).json({ msg: 'User doesn not exist' }));
  }
};
