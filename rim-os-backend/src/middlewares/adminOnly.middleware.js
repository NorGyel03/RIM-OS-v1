const adminOnly = (req, res, next) => {
  // req.user is set by authMiddleware
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

export default adminOnly;
