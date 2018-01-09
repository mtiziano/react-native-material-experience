'use strict'
import React, { Component } from 'react';
import {
  View,
  Animated,
  Platform,
  Dimensions,
  Image,
  Text
} from 'react-native';
import { ActionIcon } from './ActionIcon';

const display = Dimensions.get('window');
export const statusbarHeight = Platform.OS == 'ios' ? 20 : (Platform.Version >= 21 ? 24 : 0); // 20 iOS : 24 android
export const appbarHeight = ( Platform.OS == 'ios' ?  44 : 56 );

export class AppBar extends Component {
  render() {
    let propStyle = this.props.style ?  this.props.style : {};
    let bgPropStyle = this.props.backgroundImageStyle ? this.props.backgroundImageStyle : {};

    let bgColor =  propStyle.backgroundColor ? propStyle.backgroundColor : '#2196f7';
    let color = 'rgba(0, 0, 0, .9)';
    if(propStyle.color) {
      color = propStyle.color;
      delete propStyle.color;
    }

    var navigationIcon = this.props.navigationIcon;
    switch(this.props.navigationIcon) {
      case 'arrow_back':
        navigationIcon = require('../../img/ic_arrow_back_white.png');
        break;
      case 'menu':
        navigationIcon = require('../../img/ic_menu_white.png');
        break;
    }
    //navigationIcon = require('../../img/ic_arrow_back_white.png');

    var height = propStyle.height ? propStyle.height : appbarHeight;
    if(height<appbarHeight) height=appbarHeight;

    var actionsWidth = this.props.actions ? (this.props.actions.length * 48) : 0

    var titlePaddingLeft = 16 + (navigationIcon ? 56 : 0);
    var titleWidth = display.width - titlePaddingLeft - actionsWidth - 12;

    var textAlign = Platform.OS === 'ios' ? 'center' : 'left';
    if(this.props.actions && this.props.actions.length>1) textAlign = 'left';

    return (
      <Animated.View style={{
        width: display.width,
        height: (this.props.statusBar ? statusbarHeight : 0) + height,
        backgroundColor: 'bgColor',
        elevation: 4,
        paddingTop: this.props.statusBar ? statusbarHeight : 0,
        flexDirection: 'row',
        ...propStyle,
      }}>

        {this.props.backgroundImage ? <Animated.Image
          source={this.props.backgroundImage}
          resizeMode='cover'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: display.width,
            ...bgPropStyle,
            height: bgPropStyle.height ? bgPropStyle.height : height,
          }}
        /> : null}

        <Animated.View style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: display.width,
          height: appbarHeight,
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: titlePaddingLeft,
          ...this.props.headerStyle
        }}>

          <Animated.Text
            style={{
              fontSize: Platform.OS === 'ios' ? 17 : 20,
              fontWeight: Platform.OS === 'ios' ? '600' : '500',
              color: color,
              textAlign: textAlign,
              ...this.props.headerTitleStyle,
              width: titleWidth,
              backgroundColor: 'transparent',
            }}
            ellipsizeMode='tail'
            numberOfLines={2}
          >{this.props.title}</Animated.Text>

        </Animated.View>

        {navigationIcon ? <ActionIcon
          iconStyle={{tintColor: color}}
          onPress={this.props.onNavigationPress}
          source={navigationIcon}
          style={{
            position: 'absolute',
            left: 0,
            top: this.props.statusBar ? statusbarHeight : 0,
          }}
        /> : null}

        <View style={{
          position: 'absolute',
          right: 4,
          top: this.props.statusBar ? statusbarHeight : 0,
          flexDirection: 'row',
        }}>
          {this.props.actions ? this.props.actions.map((action, index) => {
            return (
              <ActionIcon
                key={index}
                title={action.title}
                source={action.icon}
                isHeaderRight={true}
                onPress={action.onPress}
                iconStyle={{
                  tintColor: color,
                  marginHorizontal: 12,
                }}
                iconLabelStyle={{
                  color: color,
                  marginHorizontal: 12,
                }}
              />
            )
          }) : null}
        </View>

      </Animated.View>
    );

    /*
    {navigationIcon ? <ActionIcon
      iconStyle={{tintColor: color}}
      onPress={this.props.onNavigationPress}
      source={navigationIcon}
    /> : null}
    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      marginHorizontal: 16,
    }}>Detail</Animated.Text>

    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      position: 'absolute',
      bottom: 14.5,
      left: 16 + (navigationIcon ? 56 : 0)
    }}>Detail</Animated.Text>
    */

    //last
    /*
    <Animated.Text style={{
      fontSize: Platform.OS === 'ios' ? 17 : 20,
      fontWeight: Platform.OS === 'ios' ? '600' : '500',
      color: color,
      textAlign: Platform.OS === 'ios' ? 'center' : 'left',
      position: 'absolute',
      bottom: 14.5,
      left: titleLeft,
      backgroundColor: 'red',
      width: titleWidth,
      ...this.props.titleStyle,
    }}>
      Museo soldati della battaglia
    </Animated.Text>
    */


  }
}






















/* eof */
