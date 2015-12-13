'use strict';
require('./index.less');

// import libs
import bootstrap from 'bootstrap3/dist/js/bootstrap';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
 
import LandingCtrl from './js/LandingCtrl.js';
import Config from './config.js';

angular.module('bootstrap', [uiRouter])
  .controller('LandingCtrl', LandingCtrl)
  .config(Config);