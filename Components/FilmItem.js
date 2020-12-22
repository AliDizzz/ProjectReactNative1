// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import FadeIn from '../Animations/FadeIn'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        positionLeft: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.positionLeft,
            {
            toValue: 0
            }
        ).start()
    }

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
          // Si la props isFilmFavorite vaut true, on affiche le 🖤
        return (
            <Image
            style={styles.favorite_image}
            source={require('../Images/ic_favorite.png')}
            />
        )
        }
    }

    render() {
        const { film, displayDetailForFilm } = this.props
    return (
        <Animated.View style={{ left: this.state.positionLeft }}>
            <FadeIn>
        <TouchableOpacity 
        onPress={ () => displayDetailForFilm(film.id)}
        style={styles.main_container}>
        <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
            <View style={styles.header_container}>
                {this._displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
            <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
        </View>
        </TouchableOpacity>
        </FadeIn>
        </Animated.View>
    )
    }
}

const styles = StyleSheet.create({
    main_container: {
    height: 190,
    flexDirection: 'row'
    },
    image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
    },
    content_container: {
    flex: 1,
    margin: 5
    },
    header_container: {
    flex: 3,
    flexDirection: 'row'
    },
    title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
    },
    vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
    },
    description_container: {
    flex: 7
    },
    description_text: {
    fontStyle: 'italic',
    color: '#666666'
    },
    date_container: {
    flex: 1
    },
    date_text: {
    textAlign: 'right',
    fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem