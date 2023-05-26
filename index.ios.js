/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StatusBarManager } from 'NativeModules';
import Game2048 from "./2048/Game2048";
import AppComponent from './lib/App';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import PieCountdown  from "./lib//PieCountdown";
class AImageDemo extends Component {
  state = {
    switch: false,
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.switch ? <PieCountdown/> : <AppComponent />
        }
        <TouchableHighlight onPress = { () => { 
          const Dimensionsss = require('Dimensions')
          const { width, height, scale } = Dimensionsss.get('window')
          alert('分辨率:' + width + ', ' + height + ',' + scale)
          this.setState({
            switch: true
          })
        } }>
          <View>
            {/* <Text style={styles.clickBtn}>Change</Text> */}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  render2() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress = {(event) => { alert('test')}}>
          Welcome to React Native v0.25!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <TouchableHighlight onPress = { () => { 
          const Dimensionsss = require('Dimensions')
          const { width, height, scale } = Dimensionsss.get('window')
          alert('分辨率:' + width + ', ' + height + ',' + JSON.stringify(this.state)) 
          this.setState({
            switch: true
          })
        } }>
          <View>
            <Text style={styles.clickBtn}>Click me</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 15
  },
  instructions: {
    textAlign: 'center',
    color: '#cff',
    marginBottom: 5,
  },

  clickBtn: {
    textAlign: 'center',
    color: '#ff8000',
    fontSize: 19,
    width: 300,
    height: 30,
    marginTop: 5,
    marginBottom: 34,
  },
});

AppRegistry.registerComponent('AImageDemo', () => AImageDemo);
