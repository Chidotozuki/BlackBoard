import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided. Authentication required." });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = user; // store entire user object
    req.userId = decoded.userId; // only store ID
    req.token = token;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }

    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
