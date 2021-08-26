import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

const Layout = ({children}) => {
    return (
        <View>
            <StatusBar backgroundColor="rgba(0,0,0,1)"/>
            {children}
        </View>
    )
}

export default Layout
