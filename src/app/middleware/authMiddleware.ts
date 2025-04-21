import config from '../config/app';
import User from '../model/User';
import { Response, Request } from 'express';
import status from 'http-status';
const jwt = require('jsonwebtoken');

const isAuth = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const authType = authHeader?.split(' ')[0];
    const authToken = authHeader?.split(' ')[1];

    if (!authHeader || !authToken || authType !== 'Bearer') {
      return res.sendStatus(status.UNAUTHORIZED);
    }
    const decoded = jwt.verify(authToken, config.authSecret);
    const user = await User.findOne({ _id: decoded._id, tokens: { $in: [authToken] } });
    if (!user) {
      return res.sendStatus(status.UNAUTHORIZED);
    }
    return res.send(user);
  } catch (e) {
    return res.sendStatus(status.UNAUTHORIZED);
  }
};

const authMiddleware = {
  isAuth,
};

export default authMiddleware;
