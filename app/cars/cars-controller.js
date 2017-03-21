import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as http from 'http';

export class CarsController {

    constructor($scope) {
        this.scope= $scope
        this.car = {};
        this.cars = [];
        let networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        this.client = new ApolloClient({ networkInterface });
        this.fetchCarsList()
    }

    fetchCarsList() {
        this.client.query({
            query: gql`
                query car{
                    car{
                        _id
                        name
                    }
                }`
        }).then(result => {
            this.addAllQueryResults(result);
            this.scope.$apply();
        });
    };

    addAllQueryResults(result) {
        this.cars = {};
        let immutableCars = result.data.car;
        this.cars = JSON.parse( JSON.stringify( immutableCars ));
    }

    showAddForm (){
        console.log('Logging cars...');
        console.log(this.cars);
        this.addFormShow = true;
    }
    hideAddForm (){
        this.addFormShow = false;
        this.editFormShow = false;
    }

    showEditForm (car){
        this.editFormShow = true;
        this.editedCarName = car.name;
        this.editedCarId = car.id;
    }

    addNewCar (car) {
        let quatedName = '"' + this.car.name + '"';
        this.client.mutate({
            mutation: gql`
                    mutation {
                    updateCar(currName : "", newName : ${quatedName}) {
                        name
                    }
                }
            `,
        }).then(result => {
            console.log('got data', result);
            this.fetchCarsList();
            this.car.name = ''
            this.addFormShow = false;
            this.scope.$apply();
        });
    };

    editCar (car) {
        car.id = this.editedCarId;
        console.log(car);
        http({method  : 'PUT',
            url     : 'http://localhost:8080/cars/updateCar',
            data    : car, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).success(function() {
            this.fetchCarsList();
            this.car.name = ''
        }).error(function() {
            // this.setError('Could not add a new car');
            console.log("Error posting JSON")
        });
        this.editFormShow = false;
    };

    removeLogic(name) {
        http.delete("http://localhost:8080/cars/removeCar/" + name).success(function (res) {
            console.log(res)
            this.fetchCarsList();
        });
    }

    removeCar (name) {
        $('[data-toggle="confirmation"]').confirmation({
            onConfirm: function () {
                console.log("logging before delete car...")
                this.removeLogic(name);
            }
        });
        this.car.name = '';
    }
};