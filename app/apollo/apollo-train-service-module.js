import angular from 'angular'
import ApolloTrainService from 'apollo/apollo-train-service'

export default angular.module('myApp.apolloServiceTrain', [])
    .service('ApolloTrainService', () => new ApolloTrainService ());