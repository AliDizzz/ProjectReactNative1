import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import FilmItem from './FilmItem';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.searchedText= ""
        this.state = { 
            films: [],
            iLoading: false
        } 
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true})  // Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results ],
                    isLoading: false      // Arret du chargement
                })}
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container} >
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText= text    }

    _searchFilms() {
        this.page = 0
        this.totalePages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    render() {
        return (
            <View style={styles.main_container}>                                              
                <TextInput
                style={styles.textinput}
                placeholder='Titre du film'
                onChangeText={(text) => this._searchTextInputChanged(text)}
                onSubmitEditing={() => this._searchFilms()} 
                />
                <Button title="Rechercher" onPress={() => this._searchFilms()}/>
                <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.page < this.totalPages) {
                        this._loadFilms()
                    }
                }}
                renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search