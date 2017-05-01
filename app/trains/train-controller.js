export class TrainController {
    constructor($scope, ApolloTrainService) {
        this.scope= $scope
        this.ApolloTrainService= ApolloTrainService;
        this.train= {};
        this.trains = [];
        this.fetchTrainList();
    }

    fetchTrainList() {
        this.ApolloTrainService.getAllTrains().then(result => {
            this.addAllQueryResults(result);
            this.scope.$apply();
        });
    }

    addAllQueryResults(result) {
        this.trains = [];
        let immutableTrains= result.data.train;
        this.trains = JSON.parse( JSON.stringify( immutableTrains));
    }
}
