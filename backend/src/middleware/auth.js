import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    const token =
      req.headers.authorization?.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export const adminOnly = (
  req,
  res,
  next
) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};