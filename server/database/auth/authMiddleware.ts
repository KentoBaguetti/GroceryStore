import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user?: any;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
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

export { authMiddleware, adminMiddleware };
