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

class Circle extends React.Component {
  render() {
    let p = ART.Path();
    p.path.push(0, this.props.cx, this.props.cy);
    p.path.push(4, this.props.cx, this.props.cy, this.props.r, 0, 360 * Math.PI / 180, 1);
    return <ART.Shape {...this.props} d={p}/>;
  }
}

export class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.scale = new Animated.Value(props.value ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.value !== nextProps.value) {
      Animated.timing(this.scale, {
        toValue: nextProps.value ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.elastic(1.4),
      }).start();
    }
  }

  render() {
    const title = this.props.title ? this.props.title : '';
    const tintColor = this.props.tintColor ? this.props.tintColor : '#2196f3';
    return (
      <TouchableRipple
        onPress={this.props.onValueChange ? ()=>this.props.onValueChange(!this.props.value) : null}
        {...this.props}
      >
        <View style={styles.container}>

          <View style={{width:24, height:24}}>
            <ART.Surface width={24} height={24}>
              <Circle cx={12} cy={12} r={10.5} stroke={tintColor} strokeWidth={2.2}/>
            </ART.Surface>

            <Animated.View style={{
              position: 'absolute',
              left: 6.5,
              top: 6.5,
              width: 11,
              height: 11,
              borderRadius: 5.5,
              backgroundColor: tintColor,
              opacity: this.scale,
              transform: [{scale:this.scale}],
            }}/>
          </View>

          <Text style={[styles.label, this.props.labelStyle]}>{this.props.title}</Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 24,
    backgroundColor: 'transparent',
    //paddingVertical: 13,
    fontSize: 19,
    color: '#000000',
  }
});
