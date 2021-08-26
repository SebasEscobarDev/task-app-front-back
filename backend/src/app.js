import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import tasksRoutes from './routes/tasks'
import usersRoutes from './routes/users'


const { Sequelize } = require('sequelize');

const app = express()

//evitar error de cors para conecciones de diferentes sitios
app.use(cors());

//ver peticion que van llegando por consola
app.use(morgan('dev'));

//usar objetos json en rutas y controladores
app.use(express.json())

//usar rutas
app.use('/tasks',tasksRoutes)
app.use('/users',usersRoutes)

export default app