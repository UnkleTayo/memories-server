import jwt from 'jsonwebtoken';

const generateToken = ({ email, id }) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const createSendToken = (user, statusCode, res) => {
  const token = generateToken({ email: user.email, id: user._id });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // log the user in
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({ status: 'success', token, result: user });
};
