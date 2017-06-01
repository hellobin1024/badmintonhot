/**
 * Created by danding on 17/5/6.
 */
import 'babel-polyfill';
var React = require('react');
var ReactDOM = require('react-dom');
import { render, } from 'react-dom'


import configureStore from './store.dev.js';
import Root from './Root'

const store = configureStore();

import crc from  'create-react-class'

render(
    <Root store={store} />,
    document.getElementById('root')
)