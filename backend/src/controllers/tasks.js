import {connect} from '../database'

//CREATE
export const saveTask = async (req, res) => {
	const connection = await connect()
	const [results] = await connection.execute('INSERT INTO tasks(title, description) VALUES (?,?)', [
		req.body.title,
		req.body.description,
	])
	res.json({
		id: results.insertId,
		...req.body
	})
}

//READ
export const getTask = async (req, res) => {
	const connection = await connect()
	const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [
		req.params.id,
	]);
	console.log( rows[0] )
	res.json(rows[0])
};

//UPDATE
export const updateTask = async (req, res) => {
	const connection = await connect()
	await connection.query('UPDATE tasks SET ? WHERE id = ?', [
		req.body,
		req.params.id
	])
	res.sendStatus(204);
}

//DELETE
export const deleteTask = async (req, res) => {
	const connection = await connect()
	const result = await connection.query('DELETE FROM tasks WHERE id = ?', [
		req.params.id,
	]);
	res.json({
        result
    })
}

//TASKS COUNT
export const getTaskCount = async (req, res) => {
	const connection = await connect()
	const [rows] = await connection.query('SELECT COUNT(*) FROM tasks');
	console.log( rows[0]["COUNT(*)"] )
	res.json(rows[0]["COUNT(*)"])
}

//ALL TASKS
export const getTasks = async (req, res) => {
	const connection = await connect()
	const [rows] = await connection.query('SELECT * FROM tasks');
	res.json(rows);
};