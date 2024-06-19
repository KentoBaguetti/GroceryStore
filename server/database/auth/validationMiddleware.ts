import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const validateRegistration = [
  body("username").isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRegistration };
