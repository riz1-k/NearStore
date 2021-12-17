import { Schema, model, models } from 'mongoose';
import './storeAddressSchema';
import './itemSchema';

const StoreSchema = new Schema({
  StoreName: {
    type: String,
    required: [true, 'Store name not entered'],
  },
  StoreAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: 'StoreAddress',
    },
  ],
  Verified: {
    type: Boolean,
    default: false,
  },
  StoreType: {
    type: String,
    required: [true, 'Store Type not given'],
  },
  ItemCategories: { type: Array },
  Items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

export default models.Store || model('Store', StoreSchema);
