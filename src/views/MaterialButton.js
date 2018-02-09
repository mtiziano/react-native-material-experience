'use strict'
import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';

/* PROPS
title
onPress
color
backgroundImage
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
    let bgColor = (this.props.type==='flat' || this.props.backgroundImage) ? 'transparent' : color;
    let textColor = this.props.type==='flat' ? color : 'white';

    let borderRadius = 2;

    let shadowStyle = (this.props.type!=='flat') ? {
      shadowColor: 'black',
      shadowOffset: {width: 0, height:2},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    } : null;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={[{
          backgroundColor: bgColor,
          //padding: 8,
          borderRadius,
        }, shadowStyle, this.props.style]}
      >

        <ImageBackground borderRadius={borderRadius} style={{
          padding: 8,
        }} source={this.props.backgroundImage}>

          <Text style={[{
            textAlign: 'center',
            color: textColor,
            fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal', //600 ios
            fontFamily: Platform.OS==='ios' ? null : 'sans-serif-medium',
            fontSize: 14,
          }, this.props.textStyle]}>{title}</Text>

        </ImageBackground>

      </TouchableOpacity>
    );
  }
};
