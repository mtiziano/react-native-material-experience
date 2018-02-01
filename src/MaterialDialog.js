'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Platform,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';

import { TouchableRipple } from './views/TouchableRipple';

let {width, height} = Dimensions.get('window');

let alertWidth = width * (Platform.OS==='ios' ? 0.723 : 0.87);
let alertHeight = height * (Platform.OS==='ios' ? 0.6 : 0.77);

/*
actins [
  title
  onPress
]
*/

const SCALE_FROM = 0.87;

export class MaterialDialog extends Component {

  constructor(props) {
    super(props);

    this.scale = new Animated.Value(props.visible ? 1 : SCALE_FROM);

    this.state = {

    }

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.visible!==nextProps.visible) {
      Animated.timing(this.scale, {
        toValue: nextProps.visible ? 1 : SCALE_FROM,
        duration: 300,
        useNativeDriver: true,
        //easing: Easing.elastic(1.4),
      }).start();
    }
  }

  renderActions() {
    if(!this.props.actions) return null;
    return (
      <View style={styles.actions}>
        {this.props.actions.map((item, index) => (
          <TouchableRipple key={index} onPress={item.onPress} style={{
            borderColor: '#e0e0e0',
            borderLeftWidth: (Platform.OS==='ios' && index>0) ? 0.5 : 0,
          }}>
            <Text style={[styles.dialogButton, {
              width: Platform.OS==='ios' ? alertWidth/this.props.actions.length : null,
            }]}>{item.title}</Text>
          </TouchableRipple>
        ))}
      </View>
    );
  }

  render() {
    let animStyle = {
      transform: [{scale:this.scale}],
    };

    return (
      <Modal
        onRequestClose={this.props.onRequestClose}
        animationType='fade'
        transparent={true}
        visible={this.props.visible}
        onShow={this.props.onShow}
      >
        <TouchableOpacity style={styles.outer} activeOpacity={1} onPress={this.props.onRequestClose}>
          <Animated.View style={[animStyle, styles.dialog]} activeOpacity={1}>
            {this.props.title ? <Text style={styles.title}>{this.props.title}</Text> : null}
            <View style={{maxHeight:alertHeight, borderRadius:0}}>
              {this.props.children}
            </View>
            {this.renderActions()}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create ({
  outer: {
    flex: 1,
    backgroundColor: Platform.OS==='ios' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    flexDirection: 'column',
    width: alertWidth,
    backgroundColor: 'white',
    borderRadius: Platform.OS==='ios' ? 13 : 3,
    elevation: 10,
  },
  title: {
    color: 'black',
    backgroundColor: 'transparent',
    fontSize: Platform.OS==='ios' ? 17 : 22,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 8,
    textAlign: Platform.OS==='ios' ? 'center' : 'left',
    fontWeight: 'normal', //600 ios
    fontFamily: Platform.OS==='ios' ? null : 'sans-serif-medium',
  },
  dialogButton: {
    color: Platform.OS==='ios' ? '#017aff' : '#009688',
    paddingVertical: Platform.OS==='ios' ? 12 : 8,
    paddingHorizontal: Platform.OS==='ios' ? 8 : 18,
    backgroundColor: 'transparent',
    fontSize: Platform.OS==='ios' ? 17 : 14,
    textAlign: Platform.OS==='ios' ? 'center' : null,
    fontWeight: 'normal',
    fontFamily: Platform.OS==='ios' ? null : 'sans-serif-medium',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: Platform.OS==='ios' ? null : 'flex-end',
    paddingBottom: Platform.OS==='ios' ? 0 : 11,
    paddingHorizontal: Platform.OS==='ios' ? 0 : 16,
    borderTopWidth: Platform.OS==='ios' ? 0.5 : 0,
    borderColor: '#e0e0e0',
  },
});
