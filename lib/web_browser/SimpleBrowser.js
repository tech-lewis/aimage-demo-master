import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class SimpleBrowser extends Component {
  state = {
    url: 'https://www.baidu.com/s?wd=Pure.Calc',
    canGoBack: false,
    canGoForward: false,
  };

  webViewRef = null;

  handleWebViewNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
    });
  };

  handleRefresh = () => {
    this.webViewRef.reload();
  };

  handleGoBack = () => {
    this.webViewRef.goBack();
  };

  handleGoForward = () => {
    this.webViewRef.goForward();
  };

  render() {
    const { url, canGoBack, canGoForward } = this.state;
    var back = '<='
    var go = '=>'
    return (
      <View style={styles.container}>
        <View style={styles.addressBarContainer}>
          <TouchableOpacity onPress={this.handleGoBack}>
            <Text style={ styles.addressButton}>{back}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleGoForward}>
            <Text style={ styles.addressButton}>{go}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.addressBar}
            value={url}
            onChangeText={url => this.setState({ url })}
            onSubmitEditing={() => this.webViewRef && this.webViewRef.goForward()}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity onPress={this.handleRefresh}>
            <Text>刷新</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={webView => (this.webViewRef = webView)}
          source={{ uri: url }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          javaScriptEnabled={true}
          injectedJavaScript={INJECTED_JAVASCRIPT}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: 10,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  addressBar: {
    flex: 1,
    height: 30,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: '#eee',
  },
  addressButton: { marginBottom: 10, color: '#4169E1' }
});

const INJECTED_JAVASCRIPT = `
  var ads = document.getElementsByTagName('iframe');
  for (var i = 0; i < ads.length; i++) {
    ads[i].style.display = 'none';
  }
`;
