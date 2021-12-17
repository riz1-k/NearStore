import connect from '@/database/connect';
import Address from '@/database/models/storeAddressSchema';

export default async (req, res) => {
  await connect();
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const address = await Address.findById(id);
        if (!address) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: address });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const address = await Address.findByIdAndUpdate(id, req.body.address, {
          new: true,
          runValidators: true,
        });

        if (!address) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: address });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteAddress = await Address.deleteOne({ _id: id });

        if (!deleteAddress) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deleteAddress });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
