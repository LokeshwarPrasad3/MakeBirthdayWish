import UserModel from '../models/user.models.js';

export const generateUniqueBirthdayId = async (name) => {
  // Convert name to uppercase and remove spaces
  let baseName = name.toLowerCase().replace(/\s+/g, '');
  let birthdayId = baseName;
  let count = 1;

  while (await UserModel.findOne({ birthdayId })) {
    birthdayId = `${baseName}${count}`;
    count++;
  }

  return birthdayId;
};
