export class CarsController {

    constructor($scope, ApolloWrapperService) {
        this.scope= $scope
        this.ApolloWrapperService= ApolloWrapperService;
        this.car = {};
        this.cars = [];
        this.fetchCarsList();
        this.startSubscriptions();
    }

    fetchCarsList() {
        this.ApolloWrapperService.getAllCars().then(result => {
            this.addAllQueryResults(result);
            this.scope.$apply();
        });
    };

    startSubscriptions() {
        this.subscribeToUpdates();
        this.subscribeToAdds();
        this.subscribeToDeletes();
    }

    subscribeToUpdates() {
        this.ApolloWrapperService.subscribeToUpdates()
            .subscribe({
                next: data => {
                    console.log('Got data- ', data);
                    console.log('Pushing to car list...');
                    this.updateCarsByUpdate(data.carUpdated);
                    return data;
                },
                error: (err) => {
                    console.log('Error- ', err);
                }
            })
    }
    subscribeToAdds() {
        this.ApolloWrapperService.subscribeToAdds()
            .subscribe({
                next: data => {
                    console.log('Got data- ', data);
                    console.log('Addddd to car list...');
                    this.cars.push(data.carAdded);
                    this.scope.$apply();
                    return data;
                },
                error: (err) => {
                    console.log('Error- ', err);
                }
            })
    }
    subscribeToDeletes() {
        this.ApolloWrapperService.subscribeToDeletes()
            .subscribe({
                next: data => {
                    console.log('Got data- ', data);
                    console.log('Removing from cars list...');
                    console.log(data.carDeleted);
                    this.updateCarsByDelete(data.carDeleted)
                    return data;
                },
                error: (err) => {
                    console.log('Error- ', err);
                }
            })
    }

    updateCarsByUpdate(updatedCar) {
        this.cars.forEach(car => {
            if(car._id === updatedCar._id) {
                car.name = updatedCar.name;
                this.scope.$apply();
            }
        })
    }
    updateCarsByDelete(deletedCar) {
        let indexToRemove = 0;
        indexToRemove = this.cars.findIndex((car) => car._id === deletedCar._id);
        this.cars.splice(indexToRemove, 1);
        this.scope.$apply();
    }

    addAllQueryResults(result) {
        this.cars = [];
        let immutableCars = result.data.car;
        this.cars = JSON.parse( JSON.stringify( immutableCars ));
    }

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
        this.ApolloWrapperService.addNewCar(this.car).then(result => {
            this.fetchCarsList();
            this.car.name = ''
            this.addFormShow = false;
        });
    };

    editCar (car) {
        car.id = this.editedCarId;
        console.log(car);
        this.ApolloWrapperService.editCar(this.editedCarName, this.car.name).then(result => {
            this.fetchCarsList();
            this.car.name = ''
            this.addFormShow = false;
        });
        this.editFormShow = false;
    };

    removeCar (name) {
        this.ApolloWrapperService.deleteCar(name)
            .then(result => {
                console.log("After delete - ", name)
            })
        this.car.name = '';
    }
};