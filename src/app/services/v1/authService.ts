import { Request } from 'express';
import User from '../../model/User';
import config from '../../config/app';
import { sendForgetPasswordTemplate } from '../../utils/email';
const jwt = require('jsonwebtoken');

export const login = async (req: Request) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  if (!user) {
    throw new Error('401');
  }
  const token = await user.generateAuthToken();
  return { user, ...{ token: token } };
};

export const logout = async (req: Request) => {
  try {
    const authHeader = req.headers.authorization;
    const authType = authHeader?.split(' ')[0];
    const authToken = authHeader?.split(' ')[1];

    if (!authHeader || !authToken) throw new Error('401');

    if (authType === 'Bearer') {
      const decoded = jwt.verify(authToken, config.authSecret);
      const user = await User.findOne({ _id: decoded._id, tokens: { $in: [authToken] } });
      if (!user) {
        throw new Error('401');
      }
      user.tokens = [];
      user.save();
    }
  } catch (e) {
    throw new Error('401');
  }
};

export const forgotPassword = async (email: string, domain: string) => {
  try {
    const user = await User.findOne({ email, active: true });
    if (!user) return false;

    const token = jwt.sign({ _id: user._id.toString() }, config.forgotSecret, {
      expiresIn: '30m',
    });
    user.tokens = [token];
    user.save();
    sendForgetPasswordTemplate(email, user?.userName, token, domain);
    return true;
  } catch (e) {
    return false;
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const decoded = jwt.verify(token, config.forgotSecret);
    const user = await User.findOne({ _id: decoded._id, tokens: { $in: [token] } });
    if (!user) {
      return false;
    }
    user.password = password;
    user.tokens = [];
    user.save();
    return true;
  } catch (e) {
    return false;
  }
};

const authService = {
  login,
  logout,
};

export default authService;
