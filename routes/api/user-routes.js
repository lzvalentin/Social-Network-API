const router = require('express').Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

//  api/user/
router.route('/').get(getAllUsers).post(createUser);

// api/user/:userid
router.route('/:userId').get(getUserByID)
.put(updateUserById)
.delete(deleteUserById);

// api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend)
.delete(removeFriend)

module.exports = router;
