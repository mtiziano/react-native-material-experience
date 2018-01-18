'use strict'
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { TouchableRipple } from './TouchableRipple';

/*
icon
onPress
title
activeColor
active

style
titleStyle
*/
export class DrawerItem extends Component {
  static defaultProps = {
    activeColor: '#2196f3',
  };

  render() {
    let icon = this.props.icon;

    let tintColor = this.props.active ? this.props.activeColor : '#212121';

    let iconView = (this.props.iconView ? (<View style={{width:24}}>{this.props.iconView}</View>) :
      (this.props.icon ? (<Image style={{width:24, height:24, tintColor}} source={this.props.icon} resizeMode='contain'/>) : null)
    );

    return (
      <TouchableRipple onPress={this.props.onPress} delayPressIn={0}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 51,
          paddingHorizontal: 16,
          backgroundColor: this.props.active ? 'rgba(0, 0, 0, 0.06)' : null,
          ...this.props.style,
        }}>
          {iconView}
          <Text style={{
            color: tintColor,
            marginLeft: icon ? 32 : 0,
            fontWeight: Platform.select({
              ios: 'normal',
              android: 'bold',
            }),
            ...this.props.titleStyle,
          }}>{this.props.title}</Text>
        </View>
      </TouchableRipple>
    );
  }
};
