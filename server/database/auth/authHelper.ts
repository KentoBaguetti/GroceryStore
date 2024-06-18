import User from "../models/userModel";

const usernameExists = async (username: string): Promise<boolean> => {
  const user = await User.findOne({ username });
  return user !== null;
};

const emailExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email });
  return user !== null;
};

export { usernameExists, emailExists };
