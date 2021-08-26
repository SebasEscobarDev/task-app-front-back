import { Router } from 'express';
import { 
    deleteTask, 
    getTask, 
    getTaskCount, 
    getTasks, 
    saveTask, 
    updateTask 
} from '../controllers/tasks';

const router = Router()

//COUNT TASKS
router.get('/count', getTaskCount)

//CREATE
router.post('/', saveTask)

//READ
router.get('/:id', getTask)

//UPDATE
router.put('/:id', updateTask)

//DELETE
router.delete('/:id', deleteTask)

//ALL TASKS
router.get('/', getTasks)

export default router