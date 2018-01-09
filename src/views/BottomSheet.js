'use strict'
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

let {width, height} = Dimensions.get('window');

export class BottomSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yPanel: new Animated.Value(height),
    }
  }

  onShow() {
    this.setState({yPanel: new Animated.Value(this.viewHeight)}, ()=>{
      Animated.timing(this.state.yPanel, {
        toValue: 0,
        duration: 300,
      }).start();
    })
  }

  onRequestClose() {
    if(this.isAnimating) return;
    this.isAnimating = true;

    Animated.timing(this.state.yPanel, {
      toValue: this.viewHeight,
      duration: 300,
    }).start();

    let ctx = this;
    setTimeout(function() {
      if(ctx.props.onRequestClose) ctx.props.onRequestClose();
      ctx.isAnimating = false;
    }, 300);
  }

  renderActions() {
    if(!this.props.actions) return null;
    return (
      <View style={{flexDirection:'row', padding:16}}>
        {this.props.actions.map((action, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{flexDirection:'column', padding:16, flex:1, alignItems:'center'}}
              onPress={()=>{
                if(action.onPress) action.onPress();
                this.onRequestClose();
              }}
            >
              <Image style={{width:48, height:48}} resizeMode='contain' source={action.icon}/>
              <Text>{action.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }

  render() {
    return (
      <Modal
        onRequestClose={this.onRequestClose.bind(this)}
        animationType='fade'
        transparent={true}
        visible={this.props.visible}
        onShow={this.onShow.bind(this)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1, backgroundColor: Platform.OS==='ios' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)'}}
          onPress={this.onRequestClose.bind(this)}
        />
        <Animated.View
          onLayout={(event) => {
            this.viewHeight = event.nativeEvent.layout.height;
          }}
          style={{
            position: 'absolute',
            width: width,
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            transform: [{translateY: this.state.yPanel}],
          }}
        >{this.renderActions()}{this.props.children}</Animated.View>
      </Modal>
    );
  }
};
