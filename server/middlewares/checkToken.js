import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const AuthToken = req.cookies.AuthToken;

  if (!AuthToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - You have no token",
    });
  }

  try {
    const decoded = jwt.verify(AuthToken, process.env.JWT_SECRET_KEY);
    console.log("🚀 ~ checkToken ~ decoded:", decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token",
      });
    }

    req.userId = decoded.userId;
    console.log("🚀 ~ checkToken ~ req.userId:", req.userId);

    next();
  } catch (error) {
    console.log("Error in checkToken:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
