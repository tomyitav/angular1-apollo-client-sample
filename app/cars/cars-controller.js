import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import * as http from 'http';

export class CarsController {

    constructor($http) {
        this.http = $http
        this.car = {};
        this.cars = [];
      // console.log('Testing controller');
      //   const networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
      //   const client = new ApolloClient({ networkInterface });
      //   client.query({
      //       query: gql`
      //           query getHeroes {
      //               car{
      //                   name
      //               }
      //           }
      //       `
      //   }).then(result => {
      //       console.log('got data', result);
      //   });
      //   this.fetchCarsList()
    }

    fetchCarsList() {
        var query = {"query": "{car{_id, name}}"}
        this.http({method  : 'POST',
            url     : 'http://localhost:8080/graphql',
            data    : query, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).then((data) => {
            this.cars = data.data.data.car;
        })
    };
    // console.log($scope.contacts);
    showAddForm (){
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
        http({method  : 'POST',
            url     : 'http://localhost:8080/graphql',
            data    : query, //forms user object
            headers : {'Content-Type': 'application/json'}
        }).success(function() {
            this.fetchCarsList();
            this.car.name = ''
        }).error(function() {
            // this.setError('Could not add a new car');
            console.log("Error posting JSON")
        });
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