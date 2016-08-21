
const MODULE_NAME = 'check-input';
import angular from 'angular';
import { EmailInputDirective } from './email-input/email-input';


angular.module(MODULE_NAME, [])
  .directive('emailInput', EmailInputDirective)
  /*.directive('chineseNumber', function () {
    return {
      restrict: 'A',
      // 必須使用 ngModel 取得 input value
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        // 假如沒有 ngModel 就 gg 了...
        if (!ngModel) return;

        var numbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        // $parsers 是檢查使用者輸入的 value
        ngModel.$parsers.push(changeFormat);

        // $formatter 是檢查來自程式的改變
        ngModel.$formatters.push(changeFormat);

        function changeFormat (value) {
          console.log('value', value);
          if ('string' === (typeof value)) {
            var temp = [];
            // 把 Number 換成中文
            for (var i = 0, len = value.length; i < len; i++ ) {
              var num = value[i];
              if (isNumber(num)) {
                var cn = numbers[parseFloat(num)];
                temp.push(cn);
              } else {
                temp.push(num)
              }
            }
            var result = temp.join('');
            // update input value after format, 會改變 $viewValue
            // 可以使用 element set value 的方式
            // element.val(result);
            // 或 再次跑 $parses 確認一次
            if (result != value) {
              ngModel.$setViewValue(result);
              ngModel.$render();
            }
            // return format result, 改變 $modelValue
            return result;
          } else {
            return value;
          }
        }

        // 檢查 input string 是不是 number string
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
      }
    }
  })*/
  .controller('myCtrl', function ($scope) {
    var ctrl = this;
    ctrl.value = '';
  })
;

export default MODULE_NAME;