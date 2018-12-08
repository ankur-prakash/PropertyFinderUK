/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet, NavigatorIOS, View, Text
} from 'react-native';

import SearchPage from './SearchPage';

export default class App extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SearchPage,
          title: 'Property Finder',
          passProps: { myProp: 'foo' },
        }} 
        style= {{flex: 1}}  
        />
    );
  }
}

/*conatiner flex 1 tells the component using this style
  to fill all available space.
   This ensures that the component’s children are visible.
   */
const styles = StyleSheet.create({

})