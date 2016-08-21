export function EmailInputDirective() {
  'ngInject';
  return {
    restrict: 'A',
    replace: true,
    require: 'ngModel',//使用 ngModel 取得 input value
    //template: ``,
    link: function (scope, element, attrs, ngModel, $timeout) {

      if (!ngModel) return;

      //将$viewValue->$modelValue
      ngModel.$parsers.push(changeFormat);

      // 将$modelValue -> $viewValue
      ngModel.$formatters.push(changeFormat);

      function changeFormat(value) {
        console.log('value', value);
        //tel
        /*if((/^1[3|4|5|7|8]\d{9}$/.test(value))){
         value = value.substr(0,3)+"-"+value.substr(3,4)+"-"+value.substr(7,4);
         }*/
        //$prefix
        /*if (isNaN(value)) {
         value = '';
         }
         if((/^[0-9]*[1-9][0-9]*$/.test(value))){
         value = '$'.concat(value);
         }
         ngModel.$setViewValue(value);
         ngModel.$render();*/

        //percent
        /*if (isNaN(value)) {
         value = '';
         }
         if ((/^[0-9]*[1-9][0-9]*$/.test(value))) {
         value = value+(value.charAt(value.length+1)).replace("", "%");
         }*/
        //number
        /*if (isNaN(value)) {
          value = '';
        }
        updateView(value);*/
        //email  /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        if ((/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
          value = value + "@@@"
        }

        return value;
      }

      function updateView(value) {
        ngModel.$viewValue = value;
        ngModel.$render();
      }

      function updateModel(value) {
        ngModelCtrl.$modelValue = value;
        $scope.ngModel = value; // overwrites ngModel value
      }

    }
  }
};
