import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as http from 'http';
// import ApolloWrapperService from 'apollo/apollo-wrapper-service'

export class CarsController {

    constructor($scope, ApolloWrapperService) {
        this.scope= $scope
        this.ApolloWrapperService= ApolloWrapperService;
        this.car = {};
        this.cars = [];
        this.fetchCarsList()
    }

    fetchCarsList() {
        this.ApolloWrapperService.getAllCars().then(result => {
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
        this.ApolloWrapperService.addNewCar(this.car).then(result => {
            console.log('got data', result);
            this.fetchCarsList();
            this.car.name = ''
            this.addFormShow = false;
        });
    };

    editCar (car) {
        car.id = this.editedCarId;
        console.log(car);
        this.ApolloWrapperService.editCar(this.editedCarName, this.car.name).then(result => {
            console.log('got data', result);
            this.fetchCarsList();
            this.car.name = ''
            this.addFormShow = false;
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
        this.ApolloWrapperService.deleteCar(name)
            .then(result => {
                console.log("After delete - ", name)
            })
        this.car.name = '';
    }
};