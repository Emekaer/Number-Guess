import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, Button, Keyboard, TouchableWithoutFeedback, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)



    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);

            Dimensions.addEventListener('change', updateLayout);

            return () => {
                Dimensions.removeEventListener('change', updateLayout);
            }
        };})
   
    const numberInputHandler = num => {
        setEnteredValue(num.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confrimInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text> You selected </Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => { props.onStartGame(selectedNumber) }}>START GAME!</MainButton>
        </Card>
    };

    return (<ScrollView>
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.screen}>
                    <Text style={styles.title}>Start a New Game</Text>
                    <Card style={styles.inputContainer}>
                        <BodyText> Select a Number </BodyText>
                        <Input style={styles.Input}
                            blurOnSubmit
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType="number-pad"
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue} />
                        <View style={styles.buttonContainer}>
                            <View style={{ width: buttonWidth }}>
                                <Button
                                    title="Reset"
                                    onPress={() => { resetInputHandler() }}
                                    color={Colors.accent} />
                            </View>
                            <View style={{ width: buttonWidth }} >
                                <Button title="Confirm"
                                    onPress={() => { confrimInputHandler() }}
                                    color={Colors.primary} />
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
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
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputContainer: {
        minWidth: 300,
        maxWidth: '95%',
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    /*   button: {
             width: 100,
          width: Dimensions.get('window').width / 4,
      }, */
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },



});

export default StartGameScreen;