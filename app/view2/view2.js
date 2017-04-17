import angular from 'angular'
import angularUIRouter from 'angular-ui-router';
import {View2Controller} from './view2-controller'

export default angular
  .module('myApp.view2', [
      angularUIRouter
  ])
  .config(($stateProvider) => {
      $stateProvider.state('view2', {
        url: '/view2',
        templateUrl: 'view2/view2.html',
        controller: View2Controller,
        controllerAs: '$ctrl'
    })
  })
