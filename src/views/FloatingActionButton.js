import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const screen = Dimensions.get('window');

/*
color
icon
tintColor
mini
style
onPress
*/

export class FloatingActionButton extends Component<{}> {

  constructor(props) {
    super(props);
  }

  render() {
    let color = this.props.color ? this.props.color : '#2196f3';
    let size = this.props.mini ? 40 : 56;

    let iconSize = this.props.iconSize ? this.props.iconSize : 24;

    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={1} style={{
        width: size,
        height: size,
        borderRadius: 28,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: 'black',
        shadowOffset: {width: 0, height:3},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 12,

        ...this.props.style
      }}>
        <Image style={{width:iconSize, height:iconSize}} source={this.props.icon} tintColor={this.props.tintColor}/>
      </TouchableOpacity>
    );
  }
}
