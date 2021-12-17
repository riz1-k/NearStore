import connect from '@/database/connect';
import Store from '@/database/models/storeSchema';

export default async (req, res) => {
  await connect();
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const store = await Store.findById(id);
        if (!store) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const store = await Store.findByIdAndUpdate(id, req.body.form, {
          new: true,
          runValidators: true,
        });

        if (!store) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: store });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteStore = await Store.deleteOne({ _id: id });

        if (!deleteStore) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deleteStore });
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
