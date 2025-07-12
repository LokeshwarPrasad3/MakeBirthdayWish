import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthdayId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    music: {
      type: String,
      required: false,
      default: 'BS00',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model('User', userSchema);
export default UserModel;
