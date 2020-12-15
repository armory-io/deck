'use strict';

import { module } from 'angular';

import { API, SETTINGS } from '@spinnaker/core';
import UIROUTER_ANGULARJS from '@uirouter/angularjs';

export const CANARY_CANARY_ACTIONS_GENERATESCORE_CONTROLLER = 'spinnaker.canary.actions.generate.score.controller';
export const name = CANARY_CANARY_ACTIONS_GENERATESCORE_CONTROLLER; // for backwards compatibility
module(CANARY_CANARY_ACTIONS_GENERATESCORE_CONTROLLER, [UIROUTER_ANGULARJS]).controller('GenerateScoreCtrl', [
  '$scope',
  '$uibModalInstance',
  'canaryId',
  function ($scope, $uibModalInstance, canaryId) {
    $scope.command = {
      duration: null,
      durationUnit: 'h',
    };

    $scope.state = 'editing';

    this.generateCanaryScore = function () {
      $scope.state = 'submitting';
      API.one('canaries', canaryId, 'generateCanaryResult')
        .post($scope.command)
        .then(function onSuccess() {
          $scope.state = 'success';
        })
        .catch(function onError() {
          $scope.state = 'error';
        });
    };

    this.cancel = $uibModalInstance.dismiss;
  },
]);
