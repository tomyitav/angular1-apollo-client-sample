/* eslint-env jasmine */
import {module, inject} from 'mocks'
import {CarsController} from './cars-controller'
import view1 from './cars'

describe('myApp.cars module', () => {
  beforeEach(module(view1.name))
  describe('cars controller', () => {
    it('should ....', inject(($controller) => {
      var view1Ctrl = $controller(CarsController)
      expect(view1Ctrl).toBeDefined()
    }))
  })
})
