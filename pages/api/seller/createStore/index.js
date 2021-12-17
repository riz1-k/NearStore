import connect from '@/database/connect';
import Store from '@/database/models/storeSchema';
import Seller from '@/database/models/sellerSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const stores = await Store.find({});
        res.status(200).json({ success: true, data: stores });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const seller = await Seller.findById(req.body.user._id).select(
          'sellerStore'
        );
        const newStore = await Store.create(req.body.form);
        const savedStore = await newStore.save();
        seller.sellerStore = savedStore;
        seller.save();
        return res.status(200).json({ success: true, savedStore });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: `Error occured while creating store` });
      }
      break;
  }
};
