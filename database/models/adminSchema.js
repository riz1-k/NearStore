import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
  adminName: {
    type: String,
    required: [true, 'Admin name not entered'],
  },
  adminEmail: {
    type: String,
    required: [true, 'Admin email not entered'],
  },
  adminPassword: {
    type: String,
    required: [true, 'Admin password not entered'],
  },
});

export default models.Admin || model('Admin', AdminSchema);
