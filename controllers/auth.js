import expressAsyncHandler from 'express-async-handler';

import User from '../models/user.js';
import { AppError } from '../utils/appErrorHandler.js';
import { createSendToken } from '../utils/createSendToken.js';

const secret = 'test';

export const register = expressAsyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(
      new AppError('User already exists, please create a new account', 404)
    );
  }

  const newUser = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
  });

  createSendToken(newUser, 201, res);
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError('Wrong credentials', 404));

  const isPasswordCorrect = user && (await user.matchPassword(password));

  if (!isPasswordCorrect) return next(new AppError('Incorrect password', 401));

  createSendToken(user, 200, res);
});
