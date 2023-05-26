import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class PieCountdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: 0,
      totalSeconds: 0,
      minutes: 1,
      seconds: 1
    };
  }

  handleStartPress = () => {
    const { minutes, seconds } = this.state;

    const totalSeconds = (Number(minutes) * 60) + Number(seconds);

    this.setState({ totalSeconds, secondsRemaining: totalSeconds });

    this.interval = setInterval(() => {
      if (this.state.secondsRemaining > 0) {
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { minutes, secondsRemaining, totalSeconds } = this.state;

    const displayMinutes = Math.floor(secondsRemaining / 60);
    const displaySeconds = secondsRemaining % 60;

    const progress = ((totalSeconds - secondsRemaining) / totalSeconds) * 3600;

    return (
      <View style={styles.container}>
        <View style={styles.ring}>
          <View style={[styles.pie, { transform: [{ rotate: `${progress}deg` }] }]} />
        </View>
        <Text style={styles.countdownText}>{`${displayMinutes}:${('0' + displaySeconds).slice(-2)}`}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Minutes"
          keyboardType="numeric"
          onChangeText={(minutes) => this.setState({ minutes })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Seconds"
          keyboardType="numeric"
          onChangeText={(seconds) => this.setState({ seconds })}
        />
        <TouchableOpacity onPress={this.handleStartPress}>
          <Text style={styles.button}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  pie: {
    position: 'absolute',
    top: 0,
    left: 100,
    width: 100,
    height: 200,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'blue',
  },
  countdownText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 20,
  },
});

