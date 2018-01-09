'use strict'
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

export class DrawerItem extends Component {
  render() {
    let icon = this.props.icon;

    /*
    this.props.icon ? <Image source={this.props.icon} resizeMode='center' style={{
      width: 24,
      height: 24,
      marginHorizontal: 16,
      ...this.props.iconStyle,
    }}/> : null
    */


    return (
      <TouchableOpacity onPress={this.props.onPress} style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 51,
        paddingHorizontal: 16,
        ...this.props.style,
      }}>
        {icon ? <View style={{width:24}}>{icon}</View> : null}
        <Text style={{
          color: '#212121',
          marginLeft: icon ? 32 : 0,
          fontWeight: Platform.select({
            ios: 'normal',
            android: 'bold',
          }),
          ...this.props.titleStyle,
        }}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
};
