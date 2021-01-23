import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// if a user wants to like a post
// we check if the user is authenticated with the auth middleware
// then the controller is called after then

const auth = (req, res, next) => {
  try {
    // Getting token from frontend
    const token = req.headers.authorization.split(' ')[1];

    // if token is less than 500 it is JWT and not google
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decodde(token);

      req.userId = decodedData?.sub;
    }
  } catch (error) {
    console.log(error);
  }

  next();
};

export default auth;
