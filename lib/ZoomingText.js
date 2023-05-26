import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ZoomingText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        scale: prevState.scale === 1 ? 1.23 : 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { text } = this.props;
    const { scale } = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, this.props.styleObject, { transform: [{ scale }] }]}>{text}</Text>
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
  },
});

