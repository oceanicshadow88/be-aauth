import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import registerService from '../../services/v1/registerService';
import status from 'http-status';
import User from '../../model/User';
import jwt from 'jsonwebtoken';
import config from '../../config/app';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(errors);
  }
  const { verifyUrl, appName, redirectHost } = req.body;
  const result = await registerService.register(req, verifyUrl, appName,  redirectHost);
  return res.send(result);
};

export const verify = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({});
  }
  
  try {
    const token: string = req.query.token as string ?? '';
    const verifyUser: any = jwt.verify(token, config.emailSecret);

    const user = await User.findOne({ _id:verifyUser.id });
    if (!user || !user.tokens.includes(token)) {
      res.status(status.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: '',
      });
      return;
    }
    user.tokens = [];
    user.verify = true;
    user.save();
    res.send({ user });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      status: 'fail',
      error: 'register err:' + JSON.stringify(err),
    });
  }
};

  
const registerController = {
  register,
  verify,
};
  
export default registerController;