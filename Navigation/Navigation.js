import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const SearchStackNavigator = () => (
            <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{title: 'Rechercher'}} />
            <Stack.Screen name="FilmDetail" component={FilmDetail}/>
        </Stack.Navigator>
)


export default () => (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Search" component={SearchStackNavigator} />
                    <Tab.Screen name="Favorites" component={Favorites} />
                </Tab.Navigator>
        </NavigationContainer>
)
    






