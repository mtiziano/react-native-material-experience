'use strict'
import React, { Component } from 'react';
import {
  View,
  Animated,
  Platform,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import { AppBar, statusbarHeight, appbarHeight } from '../views/AppBar';

const display = Dimensions.get('window');


export class CoordinatorLayout extends Component {
constructor(props) {
  super(props);

  this.state = {
    scrollY: new Animated.Value(0),
  };
}

  render() {
    var initialHeight = this.props.initialHeight ? this.props.initialHeight : (display.width * 0.7);
    var finalHeight = appbarHeight;
    if(this.props.statusBar) {
      initialHeight += statusbarHeight;
      finalHeight += statusbarHeight;
    }
    var deltaHeight = initialHeight - finalHeight;

    const currentHeight = this.state.scrollY.interpolate({
      inputRange: [0, deltaHeight],
      outputRange: [initialHeight, finalHeight],
      extrapolate: 'clamp',
    });

    const bgImageHeight = this.props.translucentAppBar ? currentHeight : this.state.scrollY.interpolate({
      inputRange: [0, deltaHeight],
      outputRange: [initialHeight-appbarHeight, finalHeight-appbarHeight],
      extrapolate: 'clamp',
    });

    const bgImageOpacity = this.state.scrollY.interpolate({
      inputRange: [deltaHeight*2/3, deltaHeight],
      outputRange: [1.0, 0.0],
      extrapolate: 'clamp',
    });

    var headerLeft = 16;
    if(this.props.navigationIcon) {
      var initialLeft = 16;
      var finalLeft = 16 + 56;

      headerLeft = this.state.scrollY.interpolate({
        inputRange: [deltaHeight*2/3, deltaHeight],
        outputRange: [initialLeft, finalLeft],
        extrapolate: 'clamp',
      });

    }

    return (
      <View style={{flex: 1}}>

        <ScrollView
          bounces={false}
          style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <View style={{paddingTop: initialHeight}}>
            {this.props.children}
          </View>
        </ScrollView>

        <AppBar
          title={this.props.title}
          statusBar={this.props.statusBar}
          navigationIcon={this.props.navigationIcon}
          onNavigationPress={this.props.onNavigationPress}
          actions={this.props.actions}
          style={{
            elevation: 0,
            ...this.props.appBarStyle,
            position: 'absolute',
            height: currentHeight,
          }}
          backgroundImage={this.props.image}
          backgroundImageStyle={{
            height: bgImageHeight,
            opacity: bgImageOpacity,
          }}
          headerStyle={{paddingLeft: headerLeft}}
          headerTitleStyle={{textAlign: 'left'}}
        />

      </View>
    );

  }
}






















/* eof */
