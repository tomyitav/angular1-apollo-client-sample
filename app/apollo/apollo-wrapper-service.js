import angular from 'angular'
import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

class ApolloWrapperService {
    // static $inject =
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        let networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        this.client = new ApolloClient({ networkInterface });
    }

    getAllCars() {
        return this.client.query({
            query: gql`
                query car{
                    car{
                        _id
                        name
                    }
                }`
        })
    }

    addNewCar (car) {
        let quatedName = '"' + car.name + '"';
        return this.client.mutate({
            mutation: gql`
                mutation {
                    updateCar(currName : "", newName : ${quatedName}) {
                        name
                    }
                }
            `,
        })
    }

    editCar (previousName, currentName) {
        let prevQuatedName = '"' + previousName + '"';
        let currentQuatedName = '"' + currentName + '"';
        return this.client.mutate({
            mutation: gql`
                mutation {
                    updateCar(currName : ${prevQuatedName}, newName : ${currentQuatedName}) {
                        name
                    }
                }
            `,
        })
    }

}

export default ApolloWrapperService