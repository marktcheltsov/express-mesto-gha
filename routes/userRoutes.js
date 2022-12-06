const router = require('express').Router();

const {getUsers, creatUser, getUser, updateUser, updateUserAvatar} = require('../controllers/index');

router.get('/', getUsers);

router.post('/', creatUser);

router.get('/:id', getUser);

router.patch('/me/avatar', updateUserAvatar);

router.patch('/me', updateUser);

const userRouter = router;

module.exports = userRouter;