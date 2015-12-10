'use strict';
require('./index.less');

// import libs
import angular from 'angular';
import uiRouter from 'angular-ui-router';
// import bootstrap from 'bootstrap3/dist/js/bootstrap';
 
import LandingCtrl from './js/LandingCtrl.js';
import Config from './config.js';

angular.module('inhall', [uiRouter])
  .controller('LandingCtrl', LandingCtrl)
  .config(Config);

console.log('done');