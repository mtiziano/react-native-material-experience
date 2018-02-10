'use strict'
import React, { Component } from 'react';
import {
  ART,
  Text,
  View,
  Image,
  Easing,
  Animated,
  Platform,
  CheckBox,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import { TouchableRipple } from './TouchableRipple';

/* PROPS
title
tintColor
onValueChange
style
labelStyle
*/

const borderWidthNormal = 2;
const borderWidthFill = 9;
const colorUnselected = '#6d6c6d';

export class MaterialCheckBox extends Component {
  static defaultProps = {
    tintColor: '#009688'
  }

  constructor(props) {
    super(props);
    this.scale = new Animated.Value(1);
    this.opaciscale = new Animated.Value(props.value ? 1 : 0);
    this.borderWidth = new Animated.Value(props.value ? borderWidthFill : borderWidthNormal);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.value !== nextProps.value) {

      const duration = 200;

      Animated.parallel([
        Animated.sequence([
          //Animated.delay(0),
          Animated.timing(this.scale, {toValue:0.85, duration, useNativeDriver:true}),
          Animated.timing(this.scale, {toValue:1,   duration, useNativeDriver:true}),
        ]),
        Animated.sequence([
          Animated.delay(nextProps.value ? 0 : duration),
          Animated.timing(this.borderWidth, {
            duration:duration, toValue:nextProps.value ? borderWidthFill : borderWidthNormal,
          }),
        ]),
        Animated.sequence([
          Animated.delay(nextProps.value ? duration : 0),
          Animated.timing(this.opaciscale, {
            duration:duration, toValue:nextProps.value ? 1 : 0,
          }),
        ]),
      ]).start();

    }
  }

  /*
  disabled
  onChange
  onValueChange
  testID
  value
  */

  onValueChange() {
    if(this.props.onValueChange) this.props.onValueChange(!this.props.value);
  }

  renderCheckBox() {
    const color = this.opaciscale.interpolate({
      inputRange: [0, 1],
      outputRange: [colorUnselected, this.props.tintColor]
    });

    return Platform.OS === 'android' ? (
      <CheckBox
        disabled={this.props.disabled}
        onChange={this.props.onChange}
        onValueChange={this.props.onValueChange}
        testID={this.props.testID}
        value={this.props.value}
      />
    ) : (
      <Animated.View style={{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{scale:this.scale}]
      }}>
        <Animated.View style={{
          width: 18,
          height: 18,
          borderColor: color,
          borderWidth: this.borderWidth,
          borderRadius: 2,
          //margin: 7,
          overflow: 'hidden',
        }}/>
        <Animated.View style={{
          position: 'absolute',
          left: 9,
          top: 10,
          width: 12.5,
          height: 7,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
          borderColor: 'white',
          opacity: this.opaciscale,
          transform: [
            {rotate:'-45deg'},
            {scale:this.opaciscale}
          ]
        }}/>
      </Animated.View>
    );
  }

  render() {
    return (
      <TouchableRipple {...this.props} onPress={this.onValueChange.bind(this)}>
        <View style={styles.container}>
          {this.renderCheckBox()}
          <Text style={[styles.label, this.props.labelStyle]}>{this.props.title}</Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#000000',
  }
});
