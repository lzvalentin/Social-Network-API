const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
  newUser,
  updateUserById,
  deleteUserById,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;
