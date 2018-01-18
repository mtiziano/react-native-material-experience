'use strict'
import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

/*
source
title
onPress

style
iconStyle
iconLabelStyle
*/
export class ActionIcon extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
        {this.props.source ?
          <Image source={this.props.source} style={{
            // 16 + 24 + 16 = 56
            width: 24,
            height: 24,
            //margin: 16, // 12 right - searchbar
            marginVertical: Platform.select({
              ios: 10,
              android: 16,
            }),

            marginHorizontal: 16,

            ...this.props.iconStyle,
          }}/>
          :
          <Text style={{
            color: 'white',

            fontWeight: Platform.select({
              ios: 'normal',
              android: 'bold',
            }),

            fontSize: 17,

            marginVertical: Platform.select({
              ios: 11.5,
              android: 16,
            }),
            marginHorizontal: Platform.select({
              ios: 16,
              android: 12,
            }),

            backgroundColor: 'transparent',

            /*
            fontWeight: 'bold',
            padding: 16,
            */

            ...this.props.iconLabelStyle,
          }}>{Platform.OS === 'ios' ? this.props.title : this.props.title.toUpperCase()}</Text>
        }
      </TouchableOpacity>
    );
  }
};
