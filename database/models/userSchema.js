import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username not entered'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your Email Address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default models.User || model('User', UserSchema);
