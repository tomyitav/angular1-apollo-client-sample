/* eslint-env jasmine */
import {module, inject} from 'mocks'
import {CarsController} from './cars-controller'
import cars from './cars'

describe('myApp.cars module', () => {
  beforeEach(module(cars.name))
  describe('cars controller', () => {
    it('should ....', inject(($controller) => {
      var view1Ctrl = $controller(CarsController)
      expect(view1Ctrl).toBeDefined()
    }))
  })
})
