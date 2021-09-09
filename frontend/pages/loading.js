import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeStack, ShopsStack } from './createStack.js';

const Drawer = createDrawerNavigator();

export default class Loading extends React.Component
{

  render(){
  
  return(
  
    <Drawer.Navigator>
      <Drawer.Screen name="Home  " component={HomeStack}/>
      <Drawer.Screen name="Shop    " component={ShopsStack} />
    </Drawer.Navigator>
  )
  
}
}