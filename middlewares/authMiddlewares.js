import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

export const isadmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      }
      if (!decoded.isadmin) {
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      }

      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
