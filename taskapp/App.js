import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur';

import LoginScreen from './screens/LoginScreen'

import TaskScreen from './screens/TaskScreen'
import TaskFormScreen from './screens/TaskFormScreen'

import ContactScreen from './screens/ContactScreen'
import DashboardScreen from './screens/DashboardScreen'


/* ASYNC STORAGE */
import Cookie from 'react-native-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage'
const client = async () => {
	await Cookie.clearAll() //clearing cookies stored 
                                       //natively before each 
                                       //request
	const cookie = await AsyncStorage.getItem('cookie')
	return await fetch('api/data', {
		headers: {
			'cookie': cookie
		}
	})
}

//definir rutas o páginas de la app
const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} 
          options={ ( {navigation} ) =>({
            title:'',
            headerTransparent: true,
          }) }
          />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} 
          options={ ( {navigation} )=>({
            title: 'Dashboard',
            headerStyle:{backgroundColor:'#036CE4'},
            headerTitleStyle: { color: 'white' },
          })} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} 
          options={ ( {navigation} )=>({
            title: 'Aplicación de Tareas',
            headerStyle:{backgroundColor:'#036CE4'},
            headerTitleStyle: { color: 'white' },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen')}>
                <Text style={{color:'white', marginRight: 20, fontSize: 15}}>Nueva</Text>
              </TouchableOpacity>
              ),
          })} />
        <Stack.Screen name="TaskFormScreen" component={TaskFormScreen}
          options={{
            title: 'Crear nueva Tarea',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.7)'
            },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App