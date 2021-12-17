import conect from '@/database/connect';
import Item from '@/database/models/itemSchema';

export default async (req, res) => {
  await conect();
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const item = await Item.findByIdAndUpdate(id, req.body.item, {
          new: true,
          runValidators: true,
        });

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteditem = await Item.deleteOne({ _id: id });

        if (!deleteditem) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deleteditem });
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
