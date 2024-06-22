import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body: any;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string = req.cookies.userCookie.token;

  if (!authHeader) {
    res.status(403).json({ error: "Access denied. Token not provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }
    res.status(400).json({ error: "Access denied: Unexpected Error" });
    return;
  }
};

const adminMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  authMiddleware(req, res, () => {
    if (req.user.role !== "admin") {
      res.status(403).json({ error: "Access denied, invalid role" });
      return;
    }
    next();
  });
};

export { authMiddleware, adminMiddleware, type CustomRequest };
