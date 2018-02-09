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

const colorUnselected = '#6d6c6d';

class Circle extends React.Component {
  render() {
    let p = ART.Path();
    p.path.push(0, this.props.cx, this.props.cy);
    p.path.push(4, this.props.cx, this.props.cy, this.props.r, 0, 360 * Math.PI / 180, 1);
    return <ART.Shape {...this.props} d={p}/>;
  }
}

export class RadioButton extends Component {
  static defaultProps = {
    tintColor: '#009688'
  }

  constructor(props) {
    super(props);
    this.scale = new Animated.Value(props.value ? 1 : 0);
    this.colorize = new Animated.Value(props.value ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    const duration = 500;
    const toValue = nextProps.value ? 1 : 0;
    if(this.props.value !== nextProps.value) {
      Animated.timing(this.scale, {toValue, duration, useNativeDriver:true, easing:Easing.elastic(1.4)}).start();
      Animated.timing(this.colorize, {toValue, duration}).start();
    }
  }

  renderRadioButton() {
    const color = this.colorize.interpolate({
      inputRange: [0, 1],
      outputRange: [colorUnselected, this.props.tintColor]
    });

    return (
      <View style={{width:24, height:24, marginHorizontal:4}}>
        {Platform.OS === 'android' ?
          <ART.Surface width={24} height={24}>
            <Circle
              cx={12} cy={12} r={9}
              stroke={this.props.value ? this.props.tintColor : colorUnselected}
              strokeWidth={2.2}
            />
          </ART.Surface>
          : <Animated.View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2.2,
            borderColor: color,
            margin: 2,
          }}/>
        }

        <Animated.View style={{
          position: 'absolute',
          left: 6.5,
          top: 6.5,
          width: 11,
          height: 11,
          borderRadius: 5,
          backgroundColor: this.props.tintColor,
          opacity: this.scale,
          transform: [{scale:this.scale}],
        }}/>
      </View>
    );
  }

  render() {
    const title = this.props.title ? this.props.title : '';
    return (
      <TouchableRipple
        onPress={this.props.onValueChange ? ()=>this.props.onValueChange(!this.props.value) : null}
        {...this.props}
      >
        <View style={styles.container}>
          {this.renderRadioButton()}
          <Text style={[styles.label, this.props.labelStyle]}>{this.props.title}</Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //paddingHorizontal: 24,
    //paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 24,
    backgroundColor: 'transparent',
    fontSize: 19,
    color: '#000000',
  }
});
