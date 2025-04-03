import API from '../api';

export const makeBirthdayWish = (userData) =>
  API.post('/users/make-birthday-wish', userData);

export const showBirthdayWish = (birthdayId) => API.get(`/users/${birthdayId}`);

export const getAllBirthdayWishes = () => API.get('/users/get-all-birthday');
