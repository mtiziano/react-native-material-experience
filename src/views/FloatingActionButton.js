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

export class FloatingActionButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let badgeColor = this.props.badgeColor || '#f72c81';
    let color = this.props.color || '#2196f3';
    let size = this.props.mini ? 40 : 56;

    let iconSize = this.props.iconSize || 24;

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
        elevation: 6,
        margin: 8,
        marginBottom: 10,

        ...this.props.style
      }}>
        <Image style={{width:iconSize, height:iconSize}} source={this.props.icon} tintColor={this.props.tintColor}/>

        {this.props.badge ?
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0.1,
            width: this.props.mini ? 10 : 20,
            height: this.props.mini ? 10: 20,
            borderRadius: this.props.mini ? 6 : 11,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: badgeColor,
          }}>
            <Text
              style={{
                color: 'white',
                fontSize: 11,
                backgroundColor: 'transparent',
                fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
                fontFamily: Platform.OS === 'ios' ? null : 'sans-serif-medium',
              }}
              children={this.props.mini ? null : this.props.badge}
            />
          </View>
        :null}

      </TouchableOpacity>
    );
  }
}
