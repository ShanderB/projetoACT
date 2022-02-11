import setStates from './states/states.js'
import { mainsControllerName, loadMainController } from './controllers/main.js'
import { popUpDirectiveName, popUpDirective } from './directives/popUpDirective.js'
import { findComicControllerName, findComicController } from './controllers/singleCharacter.js'
import { factoryName, factory } from './factory/factory.js'

angular.module('Comics', ['ui.router', 'infinite-scroll'])
  .config(setStates)
  .controller(mainsControllerName, loadMainController)
  .controller(findComicControllerName, findComicController)
  .directive(popUpDirectiveName, popUpDirective)
  .value('$anchorScroll', angular.noop)
  .factory(factoryName, factory)
