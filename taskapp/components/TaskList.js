import React, {useEffect, useState} from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import TaskItem from './TaskItem'
import { getTasks, deleteTask } from '../api-task';

const TaskList = () => {

    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    //isFocuse cambia cuando cambio de venatnas, define la propiedad para saber en que ventana estoy.
    const isFocuse = useIsFocused()

    //cargar tareas
    const loadTask = async () =>{
        const data = await getTasks()
        setTasks(data)
    }

    //funcion inicial que cuando cambie isFocuse se ejecuta de nuevo  esta funcion
    useEffect(() => {
        loadTask()
    }, [isFocuse])

    const handleDelete = async (id) =>{
        await deleteTask(id)
        await loadTask()
    }

    const renderItem = ({item})=>{
        return <TaskItem task={item} handleDelete={handleDelete} />
    }

    const onRefresh = React.useCallback( async () => {
        setRefreshing(true)
        await loadTask();
        setRefreshing(false)
    } )

    return (
        <FlatList
            style={{width: '100%', backgroundColor: '#fff'}}
            data={tasks}
            keyExtractor={(item) => item.id+''}
            renderItem={renderItem} 
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    colors={["red"]}
                    onRefresh={onRefresh}
                    progressBackgroundColor="white"
                />
            }
        />
    )
}

export default TaskList
