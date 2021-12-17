import { Schema, model, models } from 'mongoose';

const StoreAddressSchema = new Schema({
  Street: {
    type: String,
    required: [true, 'Street  not entered'],
  },
  Area: {
    type: String,
    required: [true, 'Locality  not entered'],
  },
  PostOffice: {
    type: String,
    required: [true, 'Post Office  not entered'],
  },
  City: {
    type: String,
    required: [true, 'City  not entered'],
  },
  District: {
    type: String,
    required: [true, 'District  not entered'],
  },
  PinCode: {
    type: String,
    required: [true, 'Pin Code  not entered'],
  },
  State: {
    type: String,
    required: [true, 'State  not entered'],
  },
  Country: {
    type: String,
    required: [true, 'Country  not entered'],
  },
});

export default models.StoreAddress || model('StoreAddress', StoreAddressSchema);
