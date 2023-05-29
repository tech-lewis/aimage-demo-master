import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity, 
    WebView,
    NativeModules,
    AlertIOS  //引入AlertIOS组件
   } from 'react-native';
  import React, { Component } from 'react';
  import SimpleBrowser from '../web_browser/SimpleBrowser';
  import { StatusBarManager } from 'NativeModules';
  const Dimensionsss = require('Dimensions')
  const NativeModule = NativeModules.NativeModule;
  const { width: screenW, height: screenH, scale } = Dimensionsss.get('window')
  export default class UserPage extends Component {
    state = {
      openWeb: false,
      openUserCenter: false,
      baiduUrl: 'https://en-m.jinzhao.wiki/wiki/IOS_version_history',
      isRequestUrl: false,
      requestUrl: '',
      showToolbar: false,
      screenHeight: 0,
      screenWidth: 0,
    }
    constructor () {
      super()
    }
    // life cycle
    componentDidMount () {
      this.setState({
        baiduUrl: 'https://www.baidu.com'
      })
      window.aountTimer = setInterval(() => {
        const { width, height, scale } = Dimensionsss.get('window')
        let {screenHeight, screenWidth } = this.state;
        if(screenWidth != width || screenHeight != height)
        this.setState({
          screenHeight: height,
          screenWidth: width
        });
      }, 511);
    }
    componentWillUnmount () {
      clearInterval(window.aountTimer);
    }
    pleaseCloseWebView = ()=> {
      this.setState({
        requestUrl: '',
        isRequestUrl: false,
        openWeb: false,
      })
    }
    pleaseOpenWebView = (url)=> {
      const { backToGameView } = this.props;
      // 这里做校验
      if ( url == 'about') {
        const Dimensionsss = require('Dimensions')
        const { width, height, scale } = Dimensionsss.get('window')
        alert('当前设备分辨率:' + width + 'x' + height + '\nnative scale: @' + scale + 'x')
        return;
      } else if (url == 'https://apps.apple.com/cn/app/pure-calc/id1132191314?l=en') {
        alert(url)
        return;
      } else if (url == '2048') {
        backToGameView()
        return;
      }
      this.setState({
        requestUrl: url,
        isRequestUrl: true,
        openWeb: true,
        useSimpleBrowser: false,
      })
    }
    render = ()=> {
      {
        return this.state.openWeb ? this.renderWeb() : this.state.openUserCenter ? this.renderUserPage() : this.renderAbout()
      }
    }
  
    renderWeb = ()=> {
      const Dimensionsss = require('Dimensions');
      const { width, height, scale } = Dimensionsss.get('window');
      var html = '<!DOCTYPE html><html><body style="background-color: gray"><h1>This is a heading!</body></html>';
      let {baiduUrl, isRequestUrl, requestUrl } = this.state;
      alert('网页加载中 ')
      if (this.state.useSimpleBrowser) return <SimpleBrowser />
      return (
        <View style={styles.container}>
          <WebView style={{ width, height }} source={{ url: isRequestUrl ? requestUrl :baiduUrl }} />  
          <View className="toolbar" style={styles.toolbar}>
            <TouchableOpacity onPress={()=>AlertIOS.prompt('温馨提醒','请输入需要前往的网址?',[
              {
                text:'前往',
                onPress: (val)=> {
                  let url = val.indexOf('www') == -1 ? ('www' + val) : val
                  url = val.indexOf('https://') == -1 ? ('https://' + val) : val
                  this.setState({
                    baiduUrl: url
                  })
                }
              }, {text:'刷新'
              }, {text:'取消',
              }
              ])}>
              <Text>🔍</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress = {this.pleaseCloseWebView }>
              <Text>❌</Text>
            </TouchableHighlight>
          </View>
        </View>
      ) 
    }
  
    renderUserPage = () => {
      return <UserPage />
    }
    renderAbout () {
      const { width, screenHeight } = Dimensionsss.get('window');
      var height = screenHeight;
      StatusBarManager.getHeight(statusH => {
        if (height > width) height -= Number(statusH);
      })
      var containerCSS = {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height,
        width
      }
      return (
        <View style={ containerCSS }>
          <View style = {{backgroundColor: '#ff9700', flex: 1, width, height   }}>
            <Text style={{ 
                paddingLeft: 20,
                paddingTop: 16,
                color: '#fff'
            }}>个人中心</Text>
            {/* 头部容器 */}
            <View style={{flex: 1, backgroundColor: '#F5FCFF', marginTop: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                
            </View>
          </View>
          <View style = {{ flex: 1, alignItems: 'center' }}>
						<Image
							source={{uri: 'AppIcon'}}
							style={{width: 50, height: 50, borderRadius: 5, borderWidth: 1, borderColor: '#ccc'}}
						/>
						<TouchableHighlight borderRadius='10' style={{ padding: 10, borderRadius: 10 }} opacity='1' underlayColor="#ccc" onPress={() => { alert('Welcome to Pure.Calc') }}>
							<Text>App Version 1.1.1.3</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor="#ccc" color='red' onPress={() => {
								this.props.callback()
                // 打开游戏页面
               //  NativeModule.RNOpenSpriteKit('')
							}}>
							<Text>Open About Page</Text>
						</TouchableHighlight>
					</View>
					{/* 设置菜单 */}
            <TouchableHighlight style={styles.bottomUrl} underlayColor="#ccc" color='red' onPress={() => {
              this.setState({
                useSimpleBrowser: true,
                isRequestUrl: false,
                requestUrl: '',
                openWeb: true,
              })
            }}>
              <Text style={{color: '#4169E1'}}>百度一下?</Text>
            </TouchableHighlight>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'red',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
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
    toolbar: {
      position:'absolute',
      backgroundColor: '#ff8000',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      right: 10,
      top: 10,
      width: 70,
      borderRadius: 10,
      height:40,
      padding: 8
    },
    author: {
      flex: 1,
      marginLeft: 20,
      flexDirection: 'column',
    },
    bottomUrl: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 16
    },
  });