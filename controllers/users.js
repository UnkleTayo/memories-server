import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js';
dotenv.config();

export const signin = async (req, res) => {
  // destructure email from body
  const { email, password } = req.body;

  try {
    // check if the user exist
    const existingUser = await User.findOne({ email });

    // check if doesnt exist
    if (!existingUser)
      return res.status(404).json({ message: 'User does not exist' });

    // validating passowrd if tey match
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // return error message
    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Invalid credentials' });
    // encrypting token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // log user in if jwt token passes
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    // check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    // Encrypting password
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Generating token
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ messge: 'User', result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
