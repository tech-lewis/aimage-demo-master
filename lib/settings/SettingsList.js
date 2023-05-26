import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';

const DATA = [
  {
    title: '通用',
    data: [
      { content: '关于Pure.Calc', url: 'about' },
      { content: '证券公司H5项目', url: 'https://wt.xzgjzx.com/home' },
      { content: '证券公司开户项目', url: 'http://kh.xzgjzx.com' },
      { content: '证券公司PC项目', url: 'https://pj.chinalin.com/#/quotes' },
      { content: '辅助功能', url: '2048' },
      { content: '软件更新', url: 'https://apps.apple.com/cn/app/pure-calc/id1132191314?l=en' },
      { content: '地区天气', url: 'https://www.baidu.com/s?wd=深圳天气' },
    ]
  },
  {
    title: '隐私',
    data: [
      { content: '位置服务', url: 'https://www.baidu.com/s?wd=位置服务' },
      { content: 'Apple ID', url: 'https://www.baidu.com/s?wd=AppleID' },
      { content: '统计数据', url: 'https://www.baidu.com/s?wd=统计数据' },
      { content: '广告', url: 'https://www.baidu.com/s?wd=iAd' },
    ]
  },
  {
    title: '网络',
    data: [
      { content: '蜂窝移动网络', url: 'https://www.baidu.com/s?wd=蜂窝移动网络' },
      { content: 'Wi-Fi', url: 'https://www.baidu.com/s?wd=wifi' },
      { content: 'VPN', url: 'https://www.baidu.com/s?wd=vpn' },
    ]
  },
  {
    title: '蓝牙',
    data: [
      { content: 'BLE', url: 'https://baike.baidu.com/item/蓝牙低能耗/12806839?fromtitle=BLE' },
      { content: 'Classic Bluetooth', url: 'https://baike.baidu.com/item/蓝牙/102670?fromtitle=Bluetooth' },
    ]
  },
  {
    title: '墙纸',
    data: []
  }
];

class CustomListItem extends Component {
  getItemElementStyle = (index, total)=> {
    var rowCss = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderBottomLeftRadius: (index == total-1) ? 16 : 0
    }
    return rowCss
  }
  render() {
    const { title, data, openWebCallback } = this.props;
    var that = this;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {
          data.map((item, index) => (
            <TouchableHighlight  key={index} onPress = {
              () => { openWebCallback(item.url) }
            }>
              <View style={ that.getItemElementStyle(index, data.length) }>
                  <Text style={styles.rowText}>{item.content}</Text>
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
          ))
        }
      </View>
    );
  }
}

class SettingsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(DATA),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <CustomListItem openWebCallback = {this.props.openWebCallback } title={rowData.title} data={rowData.data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  section: {
    backgroundColor: '#F5FCFF',
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 0.1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 33,
    fontWeight: 'bold',
    color: 'black'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  'row:last-child': {
    borderBottomLeftRadius: 16,
    backgroundColor: 'red'
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: '#333333'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#F5FCFF'
  }
});

export default SettingsList;
