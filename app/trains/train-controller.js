export class TrainController {
    constructor($scope, ApolloWrapperService) {
        this.scope= $scope
        this.ApolloWrapperService= ApolloWrapperService;
        this.train= {};
        this.trains = [];
    }
}
