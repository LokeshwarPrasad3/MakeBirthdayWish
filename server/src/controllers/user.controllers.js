import UserModel from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateUniqueBirthdayId } from '../utils/utilities.js';

export const makeBirthdayWish = asyncHandler(async (req, res) => {
  const { name, avatar, dob, message } = req.body;
  console.log('message is ', message);
  // dob in the format of DD-MM-YYYY
  if (!name || name.length <= 5 || !avatar || !dob || !message) {
    throw new ApiError(400, 'All fields are required, and name must be longer than 5 characters');
  }
  // Generate unique birthday ID
  const birthdayId = await generateUniqueBirthdayId(name);
  const createUser = await UserModel.create({
    name,
    avatar,
    birthdayId,
    dob,
    message,
  });
  if (!createUser) {
    throw new ApiError(500, 'User not created');
  }
  // Return response
  console.log(createUser);
  return res
    .status(201)
    .json(new ApiResponse(201, { birthdayId: createUser.birthdayId }, 'User created successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find();
  if (!users) {
    throw new ApiError(500, 'Users not found');
  }
  console.log('Hellow');
  // console.log(users.length)
  return res.status(200).json(new ApiResponse(200, users, 'Users found successfully'));
});

export const featchUserDetails = asyncHandler(async (req, res) => {
  const { birthdayId } = req.params;
  if (!birthdayId) {
    throw new ApiError(400, 'Birthday ID is required');
  }
  const user = await UserModel.findOne({ birthdayId });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return res.status(200).json(new ApiResponse(200, user, 'User found successfully'));
});

export const deleteAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.deleteMany();
  if (!users) {
    throw new ApiError(500, 'Users not found');
  }
  return res.status(200).json(new ApiResponse(200, users, 'Users deleted successfully'));
});
