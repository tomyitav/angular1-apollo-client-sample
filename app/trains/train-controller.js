export class TrainController {
    constructor($scope, ApolloCarService) {
        this.scope= $scope
        this.ApolloCarService= ApolloCarService;
        this.train= {};
        this.trains = [];
    }
}
