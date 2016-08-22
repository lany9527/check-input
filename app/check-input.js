/**
 * Created by littlestone on 16-8-22.
 */
export function CheckInputDirective($parse, $timeout) {
  'ngInject';

  let rules = {
    //整数
    integer(viewValue, ngModel, options){
      let integer = parseInt(viewValue);

      if (isNaN(integer)) {
        integer = '';
      }

      return integer;
    },
    //浮点数
    float(viewValue, ngModel, options){

      if (isNaN(+viewValue)) {
        viewValue += '';
        return viewValue ? viewValue.slice(0, viewValue.length - 1) : '';
      }

      if (/^\d+\.(\d*0)?$/.test(viewValue)) {
        return viewValue + '';
      }

      if (+viewValue === 0) {
        ngModel._updateModel(0);
        return viewValue + '';
      }

      let float = parseFloat(viewValue);

      // min value TODO:not perfect and fixed it please
      if (options.min !== void 0) {
        if (float < options.min) {
          float = options.min;
        }
      }

      // max value
      if (options.max) {
        if (float > options.max) {
          float = options.max;
        }
      }

      if (options.digits) {
        float = (+float).toFixed(options.digits);
      }

      return isNaN(+float) ? viewValue : (+float) + '';
    },
    //数字
    number(viewValue, ngModel, options){
      if (viewValue == undefined) return '';
      var number = viewValue;
      /*if(isNaN(number)){
        let regExp = /^0+|[^0-9]+/g;
        ngModel._formatInput(number, regExp, '');
      }*/
      if (isNaN(number)){
        number=number.replace(/\D+/g,'');
      }

      ngModel._updateView(number);
      console.log(number);
      return number;
    },
    //百分数
    percent(viewValue, ngModel, options){

    },
    //电子邮件
    email(viewValue, ngModel, options = {}){
      return viewValue;
    },
    //电话
    phone(viewValue, ngModel, options = {}){
      if((/^1[3|4|5|7|8]\d{5}$/).test(viewValue)){
        viewValue = viewValue.substr(0,3)+" "+viewValue.substr(3,4)+" ";
        /*viewValue = viewValue.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, "$1-$2-$3");*/
      }
      /*if((/^1[3|4|5|7|8]\d{9}$/.test(viewValue))){
        viewValue = viewValue.substr(0,3)+"-"+viewValue.substr(3,4)+"-"+viewValue.substr(7,4);
      }*/
      ngModel._updateView(viewValue);
      console.log(viewValue);
      return viewValue;
    },
    //美元前缀
    usdPrefix(viewValue, ngModel, options){
      let initValue = viewValue;
      if((/^[0-9]*[1-9][0-9]*$/).test(viewValue)){
        viewValue = '$'+viewValue;
      }
      ngModel._updateView(viewValue);
      console.log(viewValue);
      return viewValue;
    },
    //Credit card number
    cardNumber(viewValue, ngModel, options){
      if((/\d+/).test(viewValue)){
        /*viewValue = viewValue.substr(0,3)+" "+viewValue.substr(3,4)+" ";*/
        viewValue = viewValue.replace(/(\d\d\d\d)(\d\d\d\d)/, "$1-$2");
      }
      ngModel._updateView(viewValue);
      console.log(viewValue);
    },
    '': viewValue=>viewValue,
    [void 0]: viewValue=>viewValue,
    [null]: viewValue=>viewValue
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function ($scope, $ele, $attr, ngModelCtrl) {
      /*$ele.bind('keyup', formatInput);

      function formatInput(value, reg, replacement){
        value = value.replace(reg, replacement);
        return value;
      }*/

      let options = $attr.checkInputOpts ? $parse($attr.checkInputOpts)($scope) : {};

      function updateView(value) {
        $timeout(function () {
          ngModelCtrl.$viewValue = value;
          ngModelCtrl.$render();
          console.log("viewValue:"+value);
        });
      }

      function updateModel(value) {
        $timeout(function () {
          ngModelCtrl.$modelValue = value;
          $scope.ngModel = value; // overwrites ngModel value
          console.log("modelValue:"+value);
        });
      }

      ngModelCtrl._updateView = updateView;
      ngModelCtrl._updateModel = updateModel;
      //ngModelCtrl._formatInput = formatInput;

      const parser = function (viewValue) {

        if (!viewValue) return viewValue;


        let parser = rules[$attr.checkInput] || rules[''];
        viewValue = parser(viewValue, ngModelCtrl, options) || viewValue;


        ngModelCtrl.$setViewValue(viewValue);
        ngModelCtrl.$render();

        return viewValue;

      };

      if(ngModelCtrl.$modelValue){
        parser(ngModelCtrl.$modelValue);
      }

      ngModelCtrl.$parsers.push(parser);

    }
  };
}
