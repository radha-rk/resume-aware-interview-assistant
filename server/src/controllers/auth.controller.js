import * as authService from "../services/auth.service.js";
import { successResponse } from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);

    return successResponse(
      res,
      201,
      "User registered successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    return successResponse(
      res,
      200,
      "Login successful",
      data
    );
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  return successResponse(
    res,
    200,
    "Current user fetched",
    req.user
  );
};