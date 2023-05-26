import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GlowingText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shadowRadius: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ shadowRadius: (this.state.shadowRadius + 55) % 100 });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { shadowRadius } = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, { textShadowRadius: shadowRadius } ]}>{this.props.text}</Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#ccc',
    textShadowOffset: { width: 3, height: 5 },
  },
});

