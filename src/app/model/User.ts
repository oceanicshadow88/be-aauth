import mongoose, { Model } from 'mongoose';
import config from '../config/app';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface IUser extends Document {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  phone: string;
  imageUrl: string;
  language: string;
  verify: boolean;
  active: boolean;
  tokens: string[];
  generateAuthToken: () => Promise<string>;
}

interface IUserModel extends Model<IUser> {
  findByCredentials: (email: string, password: string) => Promise<IUser>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String },
    lastName: { type: String },
    language: { type: String },
    phone: { type: String },
    gender: { type: String },
    dob: { type: Date },
    userName: { type: String, require: true },
    imageUrl: { type: String, require: true },
    tokens: [{ type: String }],
    verify: { type: Boolean, require: true, default: false },
    active: { type: Boolean, require: true, default: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.authSecret, { expiresIn: '24h' });
  user.tokens = user.tokens.concat([token]);
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const id = userObject._id;
  userObject.id = id;
  delete userObject._id;
  delete userObject.__v;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.active;
  delete userObject.verify;
  return userObject;
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
