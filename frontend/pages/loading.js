import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeStack, ShopStack } from './createStack.js';

const Drawer = createDrawerNavigator();

export default class Loading extends React.Component
{

  render(){
  
  return(
  
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} options={{headerShown:false}}/>
      <Drawer.Screen name="Shop" component={ShopStack} options={{headerShown:false}}/>
    </Drawer.Navigator>
  )
  
}
}