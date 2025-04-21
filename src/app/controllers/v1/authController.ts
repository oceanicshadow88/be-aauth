import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import status from 'http-status';
import authService, { forgotPassword, resetPassword } from '../../services/v1/authService';
import { logger } from '../../../loaders/logger';

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(errors);
  }
  try {
    const result = await authService.login(req);
    res.send(result);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.message.includes('401')) {
      res.sendStatus(401);
      return;
    }
    logger.error('loginController:', JSON.stringify(e));
    res.sendStatus(500);
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(errors);
  }
  try {
    await authService.logout(req);
    res.sendStatus(200);
  } catch (e: any) {
    if (e.message.includes('401')) {
      res.sendStatus(401);
      return;
    }
    logger.error('logoutController:', JSON.stringify(e.message));
    res.sendStatus(500);
    return;
  }
};

export const forgot = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({});
  }
  const result = await forgotPassword(req.body.email, req.body.domain);
  return result ? res.status(status.OK).send() : res.status(status.UNAUTHORIZED).send();
};

export const reset = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(status.UNPROCESSABLE_ENTITY).json({});
  }
  const result = await resetPassword(req.body.token, req.body.password);
  return result ? res.status(status.OK).send() : res.status(status.UNAUTHORIZED).send();
};

const authController = {
  login,
  logout,
  forgot,
  reset,
};

export default authController;
