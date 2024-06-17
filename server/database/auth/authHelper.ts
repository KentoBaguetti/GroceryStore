import User from "../models/userModel";

const validateUsername = async (username: string): Promise<boolean> => {
  const user = User.findOne({ username });
  return user === null ? false : true;
};

const validateEmail = async (email: string): Promise<boolean> => {
  const user = User.findOne({ email });
  return user === null ? false : true;
};

export { validateUsername, validateEmail };
