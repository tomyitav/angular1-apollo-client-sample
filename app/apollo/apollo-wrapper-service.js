import IHttpService from 'angular'

class ApolloWrapperService {
    // static $inject =
    /*@ngInject*/
    constructor($http) {
        console.log($http)
        this.$http = $http;
        console.log(this.$http)
    }

    getFullName() {
        this.$http.get('www.example.com').then((data) => {
            console.log('got data');
            console.log(data);
        })
        return 'Hiiii!!!';
    }

}

export default ApolloWrapperService

