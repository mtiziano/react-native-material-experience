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
import { ActionIcon } from './views/ActionIcon';




const display = Dimensions.get('window');
const statusbarHeight = Platform.OS == 'ios' ? 20 : (Platform.Version >= 21 ? 24 : 0); // 20 iOS : 24 android
const navbarHeight = ( Platform.OS == 'ios' ?  44 : 56 ) + statusbarHeight; // ios 20 + 44

const DrawerContent = (props) => (
  <ScrollView style={{flex: 1, flexDirection:'column'}}>
    {props.drawerHeader ? props.drawerHeader : <View style={{height: statusbarHeight}}/>}
    <DrawerItems  {...props}/>
  </ScrollView>
);

export const MaterialDrawerNavigator = (routeConfigs, config) => {
  if(!config.colorPrimary) config.colorPrimary = '#2196f7';
  if(!config.colorTint) config.colorTint = '#f82101';
  if(!config.colorHeaderText) config.colorHeaderText = 'white';

  var routes = {};

  Object.keys(routeConfigs).forEach((key) => {
    var srcNode = routeConfigs[key];

    let tintColor = config.colorHeaderText;
    if(srcNode.navigationOptions && srcNode.navigationOptions.tintColor) tintColor = srcNode.navigationOptions.tintColor;

    srcNode.navigationOptions = ({navigation}) => ({
      headerTintColor : tintColor,
      headerTitleStyle: Platform.OS === 'ios' ? null : { paddingLeft: 16, fontSize: 20 },
      headerStyle: {backgroundColor:config.colorPrimary, paddingTop: statusbarHeight, height: navbarHeight},
      headerLeft: <ActionIcon
                    iconStyle={{tintColor: tintColor}}
                    onPress={()=>navigation.navigate('DrawerOpen')}
                    source={require('../img/ic_menu_white.png')}/>,
      ...srcNode.navigationOptions,
    })

    var node = {
      screen: StackNavigator({
        Index: srcNode,
      })
    };

    routes[key] = node;

  });

  return DrawerNavigator(routes, {
    headerMode: 'screen',
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: config.colorTint,
      colorPrimary: config.colorPrimary,
      drawerHeader: config.drawerHeader,
    },
    ...config,
  });

}
