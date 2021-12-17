import connect from '@/database/connect';
import Store from '@/database/models/storeSchema';
import Item from '@/database/models/itemSchema';

export default async (req, res) => {
  await connect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const storeItems = await Item.find({});
        res.status(200).json({ success: true, data: storeItems });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const item = await Store.findById(req.body.store).select('Items');
        const newItem = await Item.create(req.body.items);
        const storeItems = await newItem.save();
        item.Items.push(storeItems);
        item.save();
        return res.status(200).json({ success: true, data: storeItems });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ msg: 'Error occured while adding items to the Store' });
      }
      break;
  }
};
