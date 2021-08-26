import {connect} from '../database';

const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

//CREATE
export const saveUser = async(req,res,next) => {
    const errors = validationResult(req);
    const connection = await connect()

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [row] = await connection.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
        );
        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await connection.execute('INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}

//READ
export const getUser = async (req, res) => {
	const connection = await connect()
	const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [
		req.params.id,
	]);
	console.log( rows[0] )
	res.json(rows[0])
};

//UPDATE
export const updateUser = async (req,res) => {
    const connection = await connect()
    const hashPass = await bcrypt.hash(req.body.password, 12);
    const [rows] = await connection.execute('UPDATE `users` SET ? ? ? WHERE id = ? ',[
        req.body.name,
        req.body.email,
        hashPass,
        req.params.id
    ]);

    if (rows.affectedRows === 1) {
        return res.status(204).json({
            message: "Usuario Actualizado.",
        });
    }
}

//DELETE
export const deleteUser = async (req, res) => {
	const connection = await connect()
	const result = await connection.query('DELETE FROM users WHERE id = ?', [
		req.params.id,
	]);
    res.json({
        result
    })
}

//ALL USERS
export const getUsers = async (req, res) => {
	const connection = await connect()
	const [rows] = await connection.query('SELECT * FROM users');
	res.json(rows);
}

//LOGIN POST
export const postLogin = async (req,res) =>{
    const errors = validationResult(req);
    const connection = await connect()

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await connection.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '24h' });

        return res.json({
            token:theToken
        });

    }
    catch(err){
        return err;
    }
}

//GET USER LOGIN WITH TOKEN
export const getUserLogin = async (req,res,next) => {
    const connection = await connect()
    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        const [row] = await connection.execute(
            "SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        console.log(row)

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }

        res.json({
            message:"No user found"
        });
        
    }
    catch(err){
        next(err);
    }
}
