import React, {useEffect, useState} from 'react'
import { View, RefreshControl, StyleSheet, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getUser, getUserLogin } from '../api-users';

const UserProfile = ({navigation, token, route}) => {

    const [userLogin, setUserLogin] = useState({})
    const [refreshing, setRefreshing] = useState(false)

    //isFocuse cambia cuando cambio de venatnas, define la propiedad para saber en que ventana estoy.
    const isFocuse = useIsFocused()

    const loadUser = async (token) => {
        const user = await getUserLogin(token);
        setUserLogin(user)
    }

    //funcion inicial que cuando cambie isFocuse se ejecuta de nuevo  esta funcion
    //usada para re render en el cambio de ventanas, al volver a la ventana dashboard cargo funciones como:
        //Pago Semanal:
            //- Admin:) Total facturación.
            //- Asistente:) facturación. oculta 
            //- Maestro:) Pago semanal calculado por facturaciones.
        //- Número de facturaciones y sus estados.
    useEffect( () => {
        //loadTask()
        //loadPagoSemanal
        //loadFacturaciones

        loadUser(token)

    }, [userLogin])

    return (
        <View style={styles.itemContainer,{width: '100%', backgroundColor: '#fff'}} >
            <Text>
                {userLogin.name}
            </Text>
            <Text>
                {userLogin.email}
            </Text>
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

})


export default UserProfile
