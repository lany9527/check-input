
const MODULE_NAME = 'check-input';
import angular from 'angular';
import { EmailInputDirective } from './email-input/email-input';
import { CheckInputDirective } from './check-input';


angular.module(MODULE_NAME, [])
  .directive('emailInput', EmailInputDirective)
  .directive('checkInput', CheckInputDirective)
  .controller('myCtrl', function ($scope) {
    var ctrl = this;
    ctrl.vFloat = '';
    ctrl.vInteger = '';
    ctrl.vUSDPrefix = '';
    ctrl.vNum = '';
  })
;

export default MODULE_NAME;