'use strict'

window.$ = window.jQuery = require('jquery');
window.Tether = require('tether');
window.Bootstrap = require('bootstrap');
const dt = require('datatables.net')();
const dtbs = require('datatables.net-bs4')(window, $);