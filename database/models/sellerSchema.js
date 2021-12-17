import { Schema, model, models } from 'mongoose';
import './storeSchema';
import './storeAddressSchema';
import './itemSchema';

const SellerSchema = new Schema({
  sellerName: {
    type: String,
    required: [true, 'Seller name not entered'],
  },
  sellerEmail: {
    type: String,
    required: [true, 'Seller email not entered'],
  },
  sellerPassword: {
    type: String,
    required: [true, 'Seller password not entered'],
  },
  sellerPhone: {
    type: String,
    required: [true, 'Seller PhonenNo. not entered'],
  },
  sellerVerified: {
    type: Boolean,
    default: false,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  sellerStore: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
  },
});

export default models.Seller || model('Seller', SellerSchema);
