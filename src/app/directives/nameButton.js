'use strict';

function postLink(scope, element, attrs) {
  scope.ok = function () {
    alert(scope.name);
  };
}

function template(element, attrs) {
  return '<button ng-click="ok()">확인</button>';
}

export default function NameButtonDef() {
  return {
    restrict: 'E',
    scope: {
      name: '='
    },
    link: postLink,
    template: template
  };
};
