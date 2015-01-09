'use strict';


angular.module('deckApp')
  .directive('securityGroup', function ($rootScope, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/application/connection/securityGroup.html',
      scope: {
        securityGroup: '=',
        displayOptions: '='
      },
      link: function (scope, el) {
        var base = el.parent().inheritedData('$uiView').state;

        scope.$state = $rootScope.$state;

        scope.loadDetails = function(e) {
          $timeout(function() {
            var securityGroup = scope.securityGroup;
            // anything handled by ui-sref or actual links should be ignored
            if (e.isDefaultPrevented() || (e.originalEvent && e.originalEvent.target.href)) {
              return;
            }
            var params = {
              region: securityGroup.region,
              accountId: securityGroup.accountName,
              name: securityGroup.name,
            };
            // also stolen from uiSref directive
            scope.$state.go('.securityGroupDetails', params, {relative: base, inherit: true});
          });
        };

      }
    };
  }
);
