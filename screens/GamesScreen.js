import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView, Dimensions } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

const generatreRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random(rndNum) * (max - min) + min);
    if (rndNum === exclude) {
        return generatreRandomBetween(min, max, exclude);
    }
    else {
        return rndNum
    }

};

const renderListItem = (value, numOfRnds) => (<View key={value} style={styles.listItem}>
    <BodyText>#{numOfRnds}</BodyText>
    <BodyText>{value}</BodyText>

</View>)

const GameScreen = props => {
    const initialGuess = generatreRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPastGuess] = useState([initialGuess]);

    const { userChoice, onGameOver } = props;

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuess.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && props.userChoice > currentGuess) || (
            direction === 'greater' && props.userChoice < currentGuess)) {
            Alert.alert('You lied', 'Your Statement is wrong', [
                { text: 'Okay', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generatreRandomBetween(currentLow.current,
            currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRound => currRound + 1);
        setPastGuess(currPastGuess => [nextNumber, ...currPastGuess])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white' /></MainButton>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView contentContainerStyle={styles.listContent}>
                    {pastGuess.map((guess,index) => (renderListItem(guess,pastGuess.length-index)))}
                </ScrollView>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
    },
    listItem: {
        flexDirection: "row",
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: "space-between",
        width: '60%',

    },
    list:{
        flex:1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    },
    listContent:{
        flexGrow: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },


});

export default GameScreen;