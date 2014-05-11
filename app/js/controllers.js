'use strict';

/* Controllers */

angular.module('blocksApp.controllers', [])
  .controller('HomeCtrl', [function() {

  }])
  .controller('PlayCtrl', ['$scope', '$interval', 'Question', function($scope, $interval, Question) {

    var question;
    var init = function() {
      $('#result').modal('hide');

      $scope.contexts = Question.contexts;
      question = new Question();
      $scope.question = question;

      startTimer();
      question.score();
    }
    $scope.init = init;

    // answer
    var showAnswer = false;
    $scope.toggleAnswer = function() {
      showAnswer = !showAnswer;
      $scope.showAnswer = showAnswer;
    }

    // ace
    $scope.aceLoaded = function(_editor) {
      _editor.setFontSize(16);
      _editor.focus();
      _editor.setOption('showPrintMargin', false)
    };

    // time
    var delay = 100;
    var timer;
    var time;
    var startTime;
    var startTimer = function() {
      stopTimer();
      time = 0;
      startTime = new Date();
      timer = $interval(function() {
        if (question.isCorrect) return;
        time = new Date() - startTime; 
        $scope.time = time;
      }, delay);
    };

    var stopTimer = function() {
      if (angular.isDefined(timer)) {
        $interval.cancel(timer);
        timer = undefined;
      }
    };

    // modal
    $scope.$watch('question.isCorrect', function() {
      if (question.isCorrect) {
        $('#result').modal('show');
      } else {
      }
    });

    init();
  }]);
