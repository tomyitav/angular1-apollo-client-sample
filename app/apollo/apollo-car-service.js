import angular from 'angular'
import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

class ApolloCarService {
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

        this.createServiceSubscriptions();
    }
    createServiceSubscriptions(){
        this.clientUpdateSubscription = this.client.subscribe({
            query: gql`
    
                subscription onCarUpdated{
                            carUpdated {
                                _id
                                name
                                speed
                            }
                        }`,
            variables: {},
        })
        this.clientAddSubscription = this.client.subscribe({
            query: gql`
                subscription onCarAdded{
                            carAdded {
                                _id
                                name
                                speed
                            }
                        }`,
            variables: {},
        })
        this.clientDeleteSubscription = this.client.subscribe({
            query: gql`
                subscription onCarDeleted{
                        carDeleted {
                                _id
                                name
                            }
                        }`,
            variables: {},
        })
    }

    getAllCars() {
        return this.client.query({
            query: gql`
                query car{
                    car{
                        _id
                        name
                        speed
                    }
                }`
        })
    }

    addNewCar (car) {
        let addCarParams = 'name: "' + car.name + '"';
        if (car.speed) {
            addCarParams += ', speed: ' + car.speed;
        }
        return this.client.mutate({
            mutation: gql`
                mutation {
                    addCar(${addCarParams}) {
                        name
                        speed
                    }
                }
            `,
        })
    }

    editCar(previousName, currentName, currentSpeed) {
        let prevQuotedName = '"' + previousName + '"';
        let currentQuotedName = '"' + currentName + '"';
        return this.client.mutate({
            mutation: gql`
                mutation {
                    updateCar(currName : ${prevQuotedName}, newName : ${currentQuotedName}, newSpeed: ${currentSpeed}) {
                        name
                        speed
                    }
                }
            `,
        })
    }
    deleteCar(name) {
        let quotedName = '"' + name + '"';
        return this.client.mutate({
            mutation: gql`
                mutation {
                    deleteCar(name : ${quotedName}) {
                        _id
                        name
                    }
                }
            `,
        })
    }

    subscribeToUpdates() {
        return this.clientUpdateSubscription;
    }
    subscribeToAdds() {
        return this.clientAddSubscription;
    }
    subscribeToDeletes() {
        return this.clientDeleteSubscription;
    }

}

export default ApolloCarService