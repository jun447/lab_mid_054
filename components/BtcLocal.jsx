import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BtcData = () => {
    const [btcData, setBtcData] = useState(null);

    useEffect(() => {
        const fetchBtcData = async () => {
            try {
                // Check if data is already saved locally
                const savedData = await AsyncStorage.getItem('btcData');
                if (savedData !== null) {
                    setBtcData(JSON.parse(savedData));
                } else {
                    // Fetch data from API if not saved locally
                    const response = await fetch(
                        'https://api.coindesk.com/v1/bpi/currentprice.json'
                    );
                    const data = await response.json();
                    setBtcData(data.bpi);
                    // Save data locally
                    await AsyncStorage.setItem('btcData', JSON.stringify(data.bpi));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchBtcData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.container} >
            <Text style={styles.txt}>
                {item.currency}: {item.rate}
            </Text>
        </View>
    );

    return (

        <View>
            <Text style={styles.title} >USing Async Storage</Text>
            {btcData && (
                <FlatList
                    data={[
                        { currency: 'USD', rate: btcData.USD.rate },
                        { currency: 'GBP', rate: btcData.GBP.rate },
                        { currency: 'EUR', rate: btcData.EUR.rate },
                    ]}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.currency}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: 'orange',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        margin: 20,
        backgroundColor: 'orangered',
    },
});

export default BtcData;
