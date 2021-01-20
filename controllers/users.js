import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({ message: 'User does not exist' });
      
    const isPasswordCorrect = await bcrypt.compare(
      paswword,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credential' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signin = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res.status(400).json({ message: 'User does not exist' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create(email, password: hashedPassword, name: `${lastName} ${lastName}`)

  const token = jwt.sign(
    { email: result.email, id: result._id },
    'test',
    { expiresIn: '1h' }
  );

  res.status(200).json({result, token})
  try {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
