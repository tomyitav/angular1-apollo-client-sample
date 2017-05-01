import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

class ApolloTrainService {
    // static $inject =
    /*@ngInject*/
    constructor() {
        let networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        // Create WebSocket client
        const wsClient = new SubscriptionClient(`ws://localhost:8090/`, {
            reconnect: true,
        });
        const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
            networkInterface,
            wsClient
        );
        this.client = new ApolloClient({
            networkInterface: networkInterfaceWithSubscriptions
        });

    }

    getAllTrains() {
        return this.client.query({
            query: gql`
                query train{
                    train{
                        _id
                        name
                        speed
                        diesel
                    }
                }`
        })
    }

}

export default ApolloTrainService