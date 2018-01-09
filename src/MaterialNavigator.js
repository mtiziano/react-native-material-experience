import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Platform,
  Dimensions,
} from 'react-native';

import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { ActionIcon } from './views/ActionIcon'



const propscolorPrimary = '#ff0044';
const propscolorTint = '#8800ff';


const display = Dimensions.get('window');
const statusbarHeight = Platform.OS == 'ios' ? 20 : (Platform.Version >= 21 ? 24 : 0); // 20 iOS : 24 android
const navbarHeight = ( Platform.OS == 'ios' ?  44 : 56 ) + statusbarHeight; // ios 20 + 44

const DrawerContent = (props) => (
  <ScrollView style={{flex: 1, flexDirection:'column'}}>
    <View style={{backgroundColor: propscolorPrimary, width: props.width, height: statusbarHeight}}/>
      <View style={{
        width: props.width,
        height: 186,
        backgroundColor: propscolorPrimary,
        padding: 32,
        flexDirection: 'row',

      }}>
        {props.drawerHeader}
      </View>
    <DrawerItems  {...props}/>

  </ScrollView>
);


export const MaterialNavigator = (routeConfigs, config) => {
  if(!config) config = {};
  if(!config.colorPrimary) config.colorPrimary = '#2196f7';

  var routes = {};

  Object.keys(routeConfigs).forEach((key) => {
    var node = routeConfigs[key];
    routes[key] = node;

    node.navigationOptions = {
      headerTintColor : 'white',
      headerTitleStyle: Platform.OS === 'ios' ? null : { paddingLeft: 16, fontSize: 20 },
      headerStyle: {backgroundColor:config.colorPrimary, paddingTop: statusbarHeight, height: navbarHeight},
      ...node.navigationOptions,
    }

  });

  return StackNavigator(routes, {
    ...config,
    //gesturesEnabled: 'false',
  });

}
