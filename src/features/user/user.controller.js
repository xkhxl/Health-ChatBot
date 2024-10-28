import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { mongo } from "mongoose";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userID = req.userID;
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      return res.status(200).send("Password is updated");
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      //hash the password
      const type = "patient";
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).send("User not found");
      } else {
        //compare the password with the hashed password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const token = jwt.sign(
            { userID: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "20h",
            }
          );

          //Send the token to the server
          return res.status(200).send({ token });
        } else {
          return res.status(400).send("Incorrect password");
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
