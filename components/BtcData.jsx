import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

const BtcData = () => {
    const [btcData, setBtcData] = useState(null)

    useEffect(() => {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => response.json())
            .then(data => setBtcData(data.bpi))
            .catch(error => console.error(error))
    }, [])

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text style={styles.txt}>{item.currency}: {item.rate}</Text>
        </View>
    )

    return (
        <View>
             <Text style={styles.title} >USing Fetch API </Text>
            {btcData && (
                <FlatList
                    data={[
                        { currency: 'USD', rate: btcData.USD.rate },
                        { currency: 'GBP', rate: btcData.GBP.rate },
                        { currency: 'EUR', rate: btcData.EUR.rate },
                    ]}
                    renderItem={renderItem}
                    keyExtractor={item => item.currency}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth : 1,
       borderColor : 'red'
    },
    txt:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: 'orange',
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: 'yellow',
    }
})

export default BtcData