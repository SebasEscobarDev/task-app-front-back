import { Router } from 'express';
import { 
    getUsers,
    getUser,
    saveUser, 
    postLogin, 
    getUserLogin,
    updateUser,
    deleteUser
} from '../controllers/users';

const router = Router();
const {body} = require('express-validator');

//CREATE
router.post('/users', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], saveUser);

//READ
router.get('/users/:id', getUser)

//UPDATE
router.put('/users/:id', updateUser)

//DELETE
router.delete('/users/:id', deleteUser)

//LOGIN
router.post('/users/login',[
    body('email',"Invalid email address")
        .notEmpty()
        .escape()
        .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
    ], postLogin);

//GET USER LOGIN WITH TOKEN
router.get('/users/getuserlogin', getUserLogin);


//ALL USERS
router.get('/users/', getUsers);

export default router
