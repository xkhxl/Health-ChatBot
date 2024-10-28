import mongoose from "mongoose";
import { UserModel } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository {
  async resetPassword(userID, newPassword) {
    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        throw new ApplicationError("User not found", 404);
      }
      user.password = newPassword;
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong whith database", 500);
    }
  }

  async signUp(newUser) {
    try {
      //create instance of model
      const user = new UserModel(newUser);
      //save the user
      await user.save();
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      } else {
        console.log(error);
        throw new ApplicationError("Something went wrong whith database", 500);
      }
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email: email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong whith database", 500);
    }
  }

  async signIn(email, password) {
    try {
      await UserModel.findOne(
        { email: email, password: password },
        (err, user) => {
          if (err) {
            throw new ApplicationError(
              "Something went wrong whith database",
              500
            );
          }
          if (!user) {
            throw new ApplicationError("Invalid email or password", 400);
          }
          return user;
        }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong whith database", 500);
    }
  }
}
