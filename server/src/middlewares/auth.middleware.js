import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new ApiError(401, "No token provided. Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(403, "User not found. Invalid Access Token");
    }

    req.user = user;
    next(); 
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, "Invalid access token");
  }
});
