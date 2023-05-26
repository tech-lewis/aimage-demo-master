import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity, 
  WebView,
  AlertIOS  //引入AlertIOS组件
 } from 'react-native';
import React, { Component } from 'react';
import UserPage from './user/user';
import SettingsList from './settings/SettingsList';
import SimpleBrowser from './web_browser/SimpleBrowser';
import { StatusBarManager } from 'NativeModules';
const Dimensionsss = require('Dimensions')
const { width: screenW, height: screenH, scale } = Dimensionsss.get('window')
export default class MainApp extends Component {
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

  closeUserPage = ()=> {
    this.setState({
      openUserCenter: false,
    })
  }
  renderUserPage = () => {
    return <UserPage callback = {this.closeUserPage}/>
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
              <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', backgroundColor: '#F5FCFF', margin: 8, marginBottom: 0}}>
                <TouchableOpacity opacity = {0.3} onPress = {()=>{
                  this.setState({
                    useSimpleBrowser: false,
                    baiduUrl: 'https://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&dyTabStr=MCwxLDMsMiw0LDYsNSw3LDgsOQ%3D%3D&word=胸肌',
                    isRequestUrl: false,
                    requestUrl: '',
                    openWeb: true,
                  })
                }}>
                  <Image
                    style={{width: 70, height: 70, borderRadius: 35, borderWidth: 1, backgroundColor: '#F5FCFF', marginLeft: 5, marginTop: 20 }}
                    source={{uri: 'AppIcon'}}
                    //source={{uri: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'}}
                  />
                </TouchableOpacity>
                {/* 开发者信息 */}
                <View className="devAuthor" style={styles.author}>
                  <Text style={{ color: '#333', textAlign: 'left', marginTop: 16, marginBottom: 8 }}>
                    开发者:  刘竞
                  </Text>
                  <Text style={{ textAlign: 'left', marginBottom: 8 }}>微信号: 13297647262</Text>
                  <TouchableHighlight borderRadius='10' style={{ borderRadius: 10 }} opacity='1' underlayColor="#ccc" onPress={() => { 
                      this.setState({
                        openUserCenter: true
                      })
                      
                    }}>
                    <Text style={{ color: '#333' }}>版本号: 1.1.8</Text>
                  </TouchableHighlight>
                </View>
              </View>
          </View>
        </View>
        {/* <Image
          source={{uri: 'AppIcon'}}
          style={{width: 50, height: 50, borderRadius: 5, borderWidth: 1, borderColor: '#ccc'}}
        /> */}
        {/* 设置菜单 */}
        <View style = {{ width: width-20, height: screenH-270, margin: 31 }}>
          <SettingsList openWebCallback = { this.pleaseOpenWebView }/>
        </View>
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