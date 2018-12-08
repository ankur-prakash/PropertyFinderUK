'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet, Text, View,
  TextInput, Button,
  SafeAreaView, Image, ActivityIndicator
} from 'react-native';
import SearchResults from './SearchResults';


/* React.createElement(Text, {style: styles.description}, "Search for houses to buy!");
This is JSX, or JavaScript syntax extension, which mixes HTML-like syntax 
directly in your JavaScript code; 
<Text style={styles.description}>Search for houses to buy!</Text> is same
*/

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: '',
    };
  }

  onPressGoButton = () => {
    this.setState({ isLoading: true });
    console.log(" Go button pressed = " + this.state.isLoading);
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this.executeQuery(query);
  }

  onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: ' + this.state.searchString + ', Next: ' + event.nativeEvent.text);
  }

  executeQuery = (query) => {

    console.log("query = " + query);
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  }

  _handleResponse = (response) => {

    this.setState({ isLoading: false, message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      console.log('Properties found: ' + response.listings.length);
      this.props.navigator.push({
        component: SearchResults,
        title: 'SearchResults',
        passProps: {listings: response.listings},
      });

      //const {navigate} = this.props.navigation;
      //navigate('Result', {listings: response.listings})

    } else {
      this.setState({ message: 'Location not recognized; please try again.' });
    }
  }

  render() {

    console.log("render called");

    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large' /> : null;

    return (
      <SafeAreaView>
        <Text style={styles.description}>Search for houses to buy!</Text>
        <Text style={styles.description}>Search by place-name or postcode.</Text>
        <View style={styles.flowRight}>
          <TextInput style={styles.searchInput}
            onChange={this.onSearchTextChanged}
            value={this.state.searchString}
            placeholder='search your location'
          />
          <Button
            onPress={this.onPressGoButton}
            title="Go"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <Image source={require('./resources/images/house.png')}
          style={styles.image} />

        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </SafeAreaView>);
  }

}

const styles = StyleSheet.create({

  image: {
    width: 217,
    height: 138,
    alignSelf: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 8,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  searchInput: {
    height: 36,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#656565',
    textAlign: 'center',
  },
});

export default SearchPage;