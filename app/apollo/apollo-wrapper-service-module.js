/**
 * Created by Tom on 23/03/2017.
 */
import angular from 'angular'
import ApolloWrapperService from 'apollo/apollo-wrapper-service'

export default angular.module('myApp.apolloService', [])
    .service('ApolloWrapperService', ['$http', ($http) => new ApolloWrapperService($http)]);