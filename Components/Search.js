import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.page = 0
        this.totalPages = 0
        this.searchedText= ""
        this.state = { 
            films: [],
            isLoading: false
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
        this.searchedText= text    
    }

    _searchFilms() {
        this.page = 0
        this.totalePages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }


_displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
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
                extraData={this.props.favoritesFilm}
            // On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
            <FilmItem
                film={item}
              // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                displayDetailForFilm={this._displayDetailForFilm}
            />
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) { // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                    this._loadFilms()
                }
            }}
        />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
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

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
    favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)