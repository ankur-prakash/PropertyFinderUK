import React, { Component } from 'react';
import {
    FlatList, TouchableHighlight,
    View, Text, StyleSheet, Image
} from 'react-native';
import ListItem from './ListItem';

export default class SearchResults extends Component {
    _keyExtractor = (item, index) => index;

    _renderItem = ({ item, index }) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log("Pressed row: " + index);
    };

    render() {
        return (
            <FlatList
                data={this.props.listings}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});