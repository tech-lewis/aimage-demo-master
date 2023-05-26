import React, { Component } from 'react';
import { View, Text, StyleSheet, ActionSheetIOS, TouchableOpacity, NativeModules } from 'react-native';
import ZoomingText from "./ZoomingText";
const NativeModule = NativeModules.NativeModule;
export default class AppComponent extends Component {
  appVersion = '1.1.1(2)';
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      secondsRemaining: 0,
    };
  }
  handleStartPress = () => {
    if (this.state.secondsRemaining > 0) {
      alert('Countdown ing...')
      return
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Begin'],
        cancelButtonIndex: 0,
        title: 'Select Hours and Minutes',
        message: 'How long do you want to count down?',
        destructiveButtonIndex: 1,
        tintColor: 'blue',
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          const { hours, minutes } = this.state;
          const totalSeconds = (Number(hours) * 60 * 60) + (Number(minutes) * 60);

          this.setState({ secondsRemaining: totalSeconds });

          this.interval = setInterval(() => {
            if (this.state.secondsRemaining > 0) {
              this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
            }
          }, 1000);
        }
      }
    );
  };
  handleHoursPress = () => {
    if (this.state.secondsRemaining > 0) {
      alert('Countdown ing...')
      return
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: -1,
        title:  'Select Hours',
        message: 'How many hours do you want to count down?',
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          this.setState({ hours: buttonIndex-1 });
        } else {
          let old = this.state.hours
          this.setState({ hours: old });
        }
      }
    );
  }
  handleMinutesPress = () => {
    if (this.state.secondsRemaining > 0) {
      alert('Countdown ing...')
      return
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: -1,
        title: 'Select Minutes',
        message: 'How many hours do you want to count down?',
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          this.setState({ minutes: buttonIndex });
          if (this.state.hours == "5" && buttonIndex == 20) {
            NativeModule.RNUpdate("update")
          }
        } else {
          let old = this.state.minutes
          this.setState({ minutes: old });
        }
      }
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { hours, minutes, secondsRemaining } = this.state;

    const displayMinutes = Math.floor(secondsRemaining / 60);
    const displaySeconds = secondsRemaining % 60;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          alert(appVersion)
        }}>
        <Text style={styles.settings}>关于</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Hours: {hours}</Text>
        <Text style={styles.text}>Minutes: {minutes}</Text>
        {/* <GlowingText /> */}
        <ZoomingText styleObject={{color: 'red'}}  text={`${displayMinutes}:${('0' + displaySeconds).slice(-2)}`}/>
        <TouchableOpacity onPress={this.handleStartPress}>
            <Text style={styles.startbutton}>Start</Text>
          </TouchableOpacity>


        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 33}}>
          <TouchableOpacity onPress={this.handleHoursPress}>
            <Text style={styles.button}>Select Hours</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.handleMinutesPress}>
            <Text style={styles.button}>Select Minutes</Text>
          </TouchableOpacity>
        </View>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  activityText: {
    fontSize: 55,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red'
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8800',
    margin:10,
    padding: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ff8800',
  },
  startbutton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8800',
    backgroundColor: '#fff',
    overflow: 'hidden',
    margin:10,
    padding: 8,
    borderWidth: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 38,
    textAlignVertical: 'center',
    borderColor: '#ff8800',
    borderRadius: 50,
    width:100,
    height: 100
  },
});

