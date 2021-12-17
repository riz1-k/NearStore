import connect from '@/database/connect';
import Store from '@/database/models/storeSchema';
import StoreAddress from '@/database/models/storeAddressSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const storeAddresses = await StoreAddress.find({});
        res.status(200).json({ success: true, data: storeAddresses });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const store = await Store.findById(req.body.store).select(
          'StoreAddress'
        );
        const newAddress = await StoreAddress.create(req.body.address);
        const savedAddressStore = await newAddress.save();
        store.StoreAddress.push(savedAddressStore);
        store.save();
        return res.status(200).json({ success: true, savedAddressStore });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Error occured while adding Store Address' });
      }
      break;
  }
};
