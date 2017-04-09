import angular from 'angular'
import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

class ApolloWrapperService {
    // static $inject =
    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
        let networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        // Create WebSocket client
        const wsClient = new SubscriptionClient(`ws://localhost:8090/`, {
            reconnect: true,
            // connectionParams: {
            //     // Pass any arguments you want for initialization
            // }
        });
        const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
            networkInterface,
            wsClient
        );
        this.client = new ApolloClient({
            networkInterface: networkInterfaceWithSubscriptions
        });

        this.clientSubscription = this.client.subscribe({
                query: gql`
                    subscription onCarUpdated{
                        carUpdated {
                            _id
                            name
                        }
                    }`,
                variables: {},
                // operationName: 'carUpdated'
            })
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
    deleteCar (name) {
        let quatedName = '"' + name + '"';
        return this.client.mutate({
            mutation: gql`
                mutation {
                    deleteCar(name : ${quatedName}) {
                        _id
                        name
                    }
                }
            `,
        })
    }

    subscribeToCars() {
        return this.clientSubscription
    }

}

export default ApolloWrapperService