/**
 * Created by Tom on 23/03/2017.
 */
import angular from 'angular'
import ApolloCarService from 'apollo/apollo-car-service'

export default angular.module('myApp.apolloService', [])
    .service('ApolloCarService', ['$http', ($http) => new ApolloCarService($http)]);