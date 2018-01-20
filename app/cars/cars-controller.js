export class CarsController {

    constructor($scope, ApolloCarService) {
        this.scope= $scope
        this.ApolloCarService= ApolloCarService;
        this.car = {
            name: "",
            speed: ""
        };
        this.cars = [];
        this.fetchCarsList();
        this.startSubscriptions();
    }

    fetchCarsList() {
        this.ApolloCarService.getAllCars().then(result => {
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
        this.ApolloCarService.subscribeToUpdates()
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
        this.ApolloCarService.subscribeToAdds()
            .subscribe({
                next: data => {
                    console.log('Got data- ', data);
                    console.log('Add to car list...');
                    if (data.carAdded) {
                        this.cars.push(data.carAdded);
                        this.scope.$apply();
                    }
                    return data;
                },
                error: (err) => {
                    console.log('Error- ', err);
                }
            })
    }
    subscribeToDeletes() {
        this.ApolloCarService.subscribeToDeletes()
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
                car.speed = updatedCar.speed;
                this.scope.$apply();
            }
        })
    }
    updateCarsByDelete(deletedCar) {
        let indexToRemove = this.cars.findIndex((car) => car._id === deletedCar._id);
        this.cars.splice(indexToRemove, 1);
        this.scope.$apply();
    }

    addAllQueryResults(result) {
        this.cars = [];
        let immutableCars = result.data.car;
        this.cars = JSON.parse( JSON.stringify( immutableCars ));
    }

    useFieldsCurrentCar (car){
        this.editedCarId = car.id;
        this.editedCarName = car.name;
        this.editedCarSpeed = car.speed;
        this.clearCarField();

    }

    clearCarField() {
        this.car.name = '';
        this.car.speed = '';
    }

    addNewCar (car) {
        this.ApolloCarService.addNewCar(car).then(() => {
            this.clearCarField();
        });
    };

    editCar (car) {
        car.id = this.editedCarId;
        console.log(car);
        if (!car.name) {
            car.name = this.editedCarName;
        }
        if (!car.speed) {
            car.speed = this.editedCarSpeed;
        }
        this.ApolloCarService.editCar(this.editedCarName, car.name, car.speed).then(() => {
            this.clearCarField();
        });
    };

    removeCar (name) {
        this.ApolloCarService.deleteCar(name)
            .then(result => {
                console.log("After delete - ", name)
                this.clearCarField();
            });
    }
};