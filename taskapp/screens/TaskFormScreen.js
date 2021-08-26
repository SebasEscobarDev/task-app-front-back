import React, {useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native'
import Layout from '../components/Layouts';
import { saveTask, getTask, updateTask } from '../api-task';

const TaskFormScreen = ({ navigation, route }) => {

    const [task, setTask] = useState({
        title: '',
        description: '',
    })

    const [editing, setEditing] = useState(false)

    const handleChange = (name, value) => setTask({...task, [name]: value })

    const handleSubmit =  async ()=>{
        try {
            if(!editing){
                await saveTask(task);
            }else{
                await updateTask(route.params.id, task);
            }
            navigation.navigate('HomeScreen')
        } catch (error) {
            console.log(error)
        }
    }

    //USE EFFECT = [] = Ejecutar solo la primera vez del renderizado
    //USE EFFECT = vacio, ejecuta siempre que cambie cualquier "state" de la app
    //USE EFFECT = variable, ejecuta la función cada que cambie el valor de la variable, tener cuidado con los ciclos infinitos

    useEffect( () => {
        if(route.params && route.params.id){
            navigation.setOptions({headerTitle:'Actualizar Tareas'})
            setEditing(true);
            (async()=>{
                const task = await getTask(route.params.id);
                setTask({title: task.title, description: task.description});
            })();
        }
    }, [])

    return (
        <Layout>
            <TextInput
                style={styles.input}
                placeholder="Escriba un Titulo"
                placeholderTextColor="red"
                onChangeText={(text) => handleChange('title', text)}
                value={task.title}
            />
            <TextInput
                style={styles.input}
                placeholder="Escriba una Decripción"
                placeholderTextColor="red"
                onChangeText={(text) => handleChange('description', text)}
                value={task.description}
            />
            { !editing ? (
                <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Guardar Tarea</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Actualizar Tarea</Text>
                </TouchableOpacity>
            )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec'
    },
    buttonSave: {
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        marginTop: 10,
        backgroundColor: '#FF2839',
        color: 'white',
        alignItems:'center',
        width: '90%',
        marginLeft: '5%',
        fontSize: 16
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonUpdate: {
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: '#e58e26',
        width: '90%',
        marginLeft: '5%'
    }
})

export default TaskFormScreen
