import { User } from "next-auth";
import { IUserService } from "./IUserService";
import users from "../constant/user.json";
export class InMemoryUserService implements IUserService {
  signInCredentials(email: string, password: string): User | Promise<User> {
    const user = users.find((user) => {
      const emailFound = email === user.email;
      console.log("emailFound", emailFound);
      const isPasswordCorrect = password === user.password;
      console.log("isPasswordCorrect", isPasswordCorrect);
      const userFound = emailFound && isPasswordCorrect;
      console.log("userFound", userFound);
      return userFound;
    }) as User;
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}

export const userService = new InMemoryUserService();
