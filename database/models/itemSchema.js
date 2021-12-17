import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  ItemName: {
    type: String,
    required: [true, 'Item name not entered'],
  },
  ItemPicture: String,
  ItemCategory: {
    type: String,
    required: [true, 'Item Category not entered'],
  },
  Price: {
    type: String,
    required: [true, 'Item Price not entered'],
  },
  AddDate: {
    type: Date,
    default: Date.now,
  },
  Available: {
    type: Boolean,
    default: true,
  },
});

export default models.Item || model('Item', ItemSchema);
