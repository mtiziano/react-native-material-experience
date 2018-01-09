
import { NativeModules } from 'react-native';



const { RNMaterialNavigation } = NativeModules;

export default RNMaterialNavigation;


export { AppBar } from './src/views/AppBar';
export { ActionIcon } from './src/views/ActionIcon';
export { DrawerItem } from './src/views/DrawerItem';

export { CoordinatorLayout } from './src/layout/CoordinatorLayout';

export { MaterialNavigator } from './src/MaterialNavigator';
export { MaterialDrawerNavigator } from './src/MaterialDrawerNavigator';
