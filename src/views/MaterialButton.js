'use strict'
import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

/* PROPS
title
onPress
color
type raised|flat
upperCase
style (to set elevation, ecc)
textStyle
*/

export class MaterialButton extends Component {
  render() {
    var title = this.props.title ? this.props.title : '';
    if(this.props.upperCase!==false) title = title.toUpperCase();

    let color = this.props.color ? this.props.color : '#2196f3';
    let bgColor = this.props.type==='flat' ? 'transparent' : color;
    let textColor = this.props.type==='flat' ? color : 'white';

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={[{
          backgroundColor: bgColor,
          padding: 8,
          borderRadius: 2,
        }, this.props.style]}
      >
        <Text style={[{
          textAlign: 'center',
          color: textColor,
          fontWeight: '500',
          fontSize: 14,
        }, this.props.textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
};
