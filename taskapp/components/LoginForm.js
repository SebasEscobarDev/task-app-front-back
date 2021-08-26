import React, {useEffect, useState} from 'react'
import { RefreshControl } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Text,
    ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import backgroundImg from '../assets/bg-login.jpg';

import { saveUser, loginUser, getUserLogin } from '../api-users';

const LoginForm = () => {

    const [passwordSecured, setPasswordSecured] = useState(true)
    const [passwordSecured2, setPasswordSecured2] = useState(true)
    const [passwordSecured3, setPasswordSecured3] = useState(true)

    //estado para determinar si estoy creando o ingresando
    const [create, setCreate] = useState(true)

    //estado que determina si está cargando
    const [refreshing, setRefreshing] = useState(false)

    //isFocuse cambia cuando cambio de ventanas, define la propiedad para saber cuando estoy o no en la ventana
    const isFocuse = useIsFocused()

    const navigation = useNavigation()

    const onRefresh = React.useCallback( async () => {
        setRefreshing(true)
        await loadTask();
        setRefreshing(false)
    } )
    
    /*###################################################*/
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [logUser, setLogUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (name, value) => setUser({...user, [name]: value })
    const handleChangeUs = (name, value) => setLogUser({...logUser, [name]: value })

    const handleSubmitUser =  async ()=>{
        try {
            if(!create){
                const token = await loginUser(logUser);
                navigation.navigate('DashboardScreen', {token:token});
            }else{
                await saveUser(user);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createAccount = () => {
        setCreate(true)
    }

    const loginAccount = () => {
        setCreate(false)
    }

    return (
        <View>
            <ImageBackground source={backgroundImg} style={styles.image} blurRadius={10}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        colors={["red"]}
                        onRefresh={onRefresh}
                        progressBackgroundColor="white"
                    />
                }
            >
                <View style={styles.boxMorphism}>
                    { !create ? (
                        <View style={styles.tabsLogin}>
                            <View style={styles.viewLogin}>
                                <Button title="CREAR CUENTA" style={styles.buttonTab} onPress={createAccount} />
                            </View>
                            <View style={styles.viewLogin}>
                                <Button title="INICIAR SESSION" style={styles.buttonTab} color="#01438B" onPress={loginAccount} />
                            </View>
                        </View>
                    ):(
                        <View style={styles.tabsLogin}>
                            <View style={styles.viewLogin}>
                                <Button title="CREAR CUENTA" style={styles.buttonTab} color="#01438B" onPress={createAccount} />
                            </View>
                            <View style={styles.viewLogin}>
                                <Button title="INICIAR SESSION" style={styles.buttonTab} onPress={loginAccount} />
                            </View>
                        </View>
                    )}
                    { !create ? (
                        <View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='envelope' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput} 
                                    placeholder='Correo Electrónico'
                                    autoCorrect={false}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    onChangeText={(text) => handleChangeUs('email', text)}
                                    value={logUser.email}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='lock' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput}
                                    placeholder={'Contraseña'}
                                    secureTextEntry={passwordSecured}
                                    textContentType={'password'}
                                    onChangeText={(text) => handleChangeUs('password', text)}
                                    value={logUser.password}
                                /> 
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 10 }}
                                    onPress={()=>{
                                        setPasswordSecured(!passwordSecured);
                                    }}
                                >
                                    <Icon color='#036CE4' name='eye' type='font-awesome' size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='user' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput} 
                                    placeholder='Nombre completo'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => handleChange('name', text)}
                                    value={user.name}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='envelope' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput} 
                                    placeholder='Correo Electrónico'
                                    autoCorrect={false}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    onChangeText={(text) => handleChange('email', text)}
                                    value={user.email}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='lock' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput}
                                    placeholder={'Contraseña'}
                                    secureTextEntry={passwordSecured2}
                                    textContentType={'password'}
                                    onChangeText={(text) => handleChange('password', text)}
                                    value={user.password}
                                />
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 10 }}
                                    onPress={()=>{
                                        setPasswordSecured2(!passwordSecured2);
                                    }}
                                >
                                    <Icon color='#036CE4' name='eye' type='font-awesome' size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputView}>
                                <Icon color='#036CE4' name='lock' type='font-awesome' size={20} />
                                <TextInput style={styles.textInput}
                                    placeholder={'Confirmar Contraseña'}
                                    secureTextEntry={passwordSecured3}
                                    textContentType={'password'}
                                />
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 10 }}
                                    onPress={()=>{
                                        setPasswordSecured3(!passwordSecured3);
                                    }}
                                >
                                    <Icon color='#036CE4' name='eye' type='font-awesome' size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    { !create ? (
                        <View>
                            <Button style={styles.button} title="Iniciar Session" color="#036CE4" onPress={handleSubmitUser}/> 
                            <Text style={{color:'black', textAlign:'center', paddingTop:5}}>
                                Si no tienes una cuenta <Text style={{color:'#036CE4'}} onPress={createAccount}>Crea una Nueva</Text>
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Button style={styles.button} title="Crear Cuenta" color="#036CE4" onPress={handleSubmitUser}/>
                            <Text style={{color:'black', textAlign:'center', paddingTop:5}}>
                                Si ya tienes una cuenta <Text style={{color:'#036CE4'}} onPress={loginAccount}>Inicia Session</Text>
                            </Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsLogin: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 10,
        flexDirection: 'row',
    },
    textBtn: {
        color:'black',
        textAlign:'center'
    },
    inputView: {
        width: '100%',
        height: 40,
        backgroundColor: '#f1f3f6',
        borderRadius: 0,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    boxMorphism: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: '90%',
        marginLeft: '5%',
        display: 'flex',
        padding: 10,
        height: 'auto',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "center", 
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 12,
        width: '100%',
    },
    viewLogin: {
        paddingBottom: 10,
        flex: 1,
        width: '100%',
    }
})

export default LoginForm