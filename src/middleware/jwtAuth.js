import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //Read the token from the header
  const token = req.headers["authorization"];
  // console.log(token);

  //If no token, return 401
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  //Verify the token
  try {
    const payload = jwt.verify(token, "pTNy9rOEmsuCdD0RvrdAmSQb4H1i2iQm");
    req.userID = payload.userID;
  } catch (error) {
    //If token is invalid, return 401
    return res.status(401).send("Unauthorized");
  }

  //call next middleware
  next();
};

export default jwtAuth;
