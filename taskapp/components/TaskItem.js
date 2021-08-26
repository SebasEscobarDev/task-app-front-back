import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default TaskItem = ({task, handleDelete}) => {

    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('TaskFormScreen', { id: task.id })}
            >
                <Text style={styles.itemtitle}>{task.title}</Text>
                <Text style={styles.itemDescription}>{task.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{backgroundColor:'#ee5253', padding: 7, borderRadius: 5}}
                onPress={() => handleDelete(task.id)}
            >
                <Text style={{color:'white'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginLeft: '5%',
        width: '90%',
        backgroundColor: "#FF2839",
        padding: 20,
        marginBottom: '2.5%',
        marginTop: '2.5%',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemtitle:{
        color: '#fff',
        fontSize: 20
    },
    itemDescription:{
        color: '#1C1817',
        maxWidth: '80%'
    }
})
