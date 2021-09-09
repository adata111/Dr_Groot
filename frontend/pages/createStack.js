import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CameraPage from './camera.js';
import Gallery from './gallery.js';
import Home from './home.js';
import CheckPlant from './check_plant.js';

const HomeStk = createStackNavigator();

export function HomeStack({navigation}){
	return(
	<HomeStk.Navigator>
		<HomeStk.Screen name="Home" component={Home} options={{
		title: "Home",
			headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)
		}} />
        <HomeStk.Screen name="Gallery" component={Gallery}/>
        <HomeStk.Screen name="CheckPlant" component={CheckPlant}/>
        <HomeStk.Screen name="Camera" component={CameraPage}/>
	</HomeStk.Navigator>
	)
}

const ShopStk = createStackNavigator();

export function ShopStack({navigation}){
	return(
	<ShopStk.Navigator>
		<ShopStk.Screen name="ShoppingHome" component={Shophome} options={{
		title: "Shopping",
			headerShown: true,
			headerLeft: (props)=>(<TouchableOpacity onPress={()=>{navigation.openDrawer()}}><Ionicons 
                name="md-menu" 
                size={25} 
                color="blue" 
                style={{ margin: 7,}} /></TouchableOpacity>)
		}} />
	</ShopStk.Navigator>
	)
}

