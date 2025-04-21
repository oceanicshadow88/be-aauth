import { Request } from 'express';
import User from '../../model/User';
import jwt from 'jsonwebtoken';
import { emailSender } from '../../utils/email';
import config from '../../config/app';

const findOrCreateUser = async (req: Request) => {
  const user = await User.findOne({ email: req.body.user.email });
  if (user) {
    return user;
  }
  return new User(req.body.user);
};

export const register = async (
  req: Request,
  url = 'api/v1/verify-email',
  appName = 'app',
  domain = 'http://localhost:8000',
) => {
  const user = await findOrCreateUser(req);
  const validationToken = jwt.sign({ id: user.id }, config.emailSecret);
  user.tokens = [validationToken];
  await user.save();
  emailSender(user.email, 'noreply@0l00000l.com', `token=${user.tokens[0]}`, url, appName, domain);
  return user;
};

const registerService = {
  register,
};

export default registerService;
