import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as http from 'http';

export class CarsController {

    constructor($http, $scope) {
        this.http = $http
        this.scope= $scope
        this.car = {};
        this.cars = [];
      // console.log('Testing controller');
        let networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        this.client = new ApolloClient({ networkInterface });
        this.fetchCarsList()
    }

    fetchCarsList() {
        // this.cars = [];
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
        let hashKey = 0
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
        console.log(car);
        var query = {"query" : 'mutation {updateCar(currName : "", newName: '+ '"'+car.name + '"'+ ') {name}}'};
        console.log(query);
        this.http({method  : 'POST',
            url     : 'http://localhost:8080/graphql',
            data    : query, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).then(() => {
            this.fetchCarsList();
            this.car.name = ''
        })
        this.addFormShow = false;
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