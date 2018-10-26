import React, {Component} from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from "./redux/reducer";
import HomeList from "./components/HomeList";

const client = axios.create({
  baseURL: 'https://www.spotahome.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeList/>
      </Provider>
    );
  }
}
