import gql from 'graphql-tag';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

export class CarsController {


    constructor() {
        this.cars = [];
      console.log('Testing controller');
        const networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
        const client = new ApolloClient({ networkInterface });
        client.query({
            query: gql`
                query getHeroes {
                    car{
                        name
                    }
                }
            `
        }).then(result => {
            console.log('got data', result);
        });
    }

    getCar() {
        return this.cars;
    }

}