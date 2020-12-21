import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites';
import { Image, StyleSheet } from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const SearchStackNavigator = () => (
            <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{title: 'Rechercher'}} />
            <Stack.Screen name="FilmDetail" component={FilmDetail}/>
        </Stack.Navigator>
)

const FavoritesStackNavigator = () => (
    <Stack.Navigator>
    <Stack.Screen name="Favorites" component={Favorites} options={{title: 'favoris'}} />
    <Stack.Screen name="FilmDetail" component={FilmDetail}/>
</Stack.Navigator>
)


export default () => (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Search" 
                        component={SearchStackNavigator}
                        options={{tabBarIcon: () => {
                            return <Image source={require('../Images/ic_search.png')} style={styles.icon}/>
                        }}} 
                        tabBarOptions={{
                            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
                            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                            showLabel: false, // On masque les titres
                            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
                        }}
                    
                    />
                    <Tab.Screen 
                        name="Favorites" 
                        component={FavoritesStackNavigator}
                        options={{tabBarIcon: () => {
                            return <Image source={require('../Images/ic_favorite.png')} style={styles.icon}/>
                        }}} 
                        tabBarOptions={{
                            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
                            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                            showLabel: false, // On masque les titres
                            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
                        }}
                    
                    />
                </Tab.Navigator>
        </NavigationContainer>
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})





