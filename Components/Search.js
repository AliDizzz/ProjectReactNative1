import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>                                              
                <TextInput style={styles.textinput } placeholder="Titre du film"/>
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => {}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search