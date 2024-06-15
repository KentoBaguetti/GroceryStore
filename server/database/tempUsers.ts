import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  username: string;
  password: string;
  salt: string;
  email: string;
  dateAndTimeUserCreated: Date;
  dateAndTimeLastLoggedIn?: Date;
}

class User implements User {
  username: string;
  password: string;
  salt: string;
  email: string;
  dateAndTimeUserCreated: Date;
  dateAndTimeLastLoggedIn?: Date;

  constructor(username: string, password: string, salt: string, email: string) {
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.email = email;
    this.dateAndTimeUserCreated = new Date();
  }

  setLogInDate(): void {
    this.dateAndTimeLastLoggedIn = new Date();
  }
}

const registerUser = (req: Request, res: Response): void => {};

export { User };
