const setStates = function ($stateProvider) {
  $stateProvider.state('index', {
    url: '',
    controler: 'MainCtrl',
    templateUrl: 'templates/character.html'
  })
    .state('index.single', {
      url: '/:id',
      templateUrl: 'templates/characterPopUp.html',
      controller: 'SingleCharacter'
    })
}

setStates.$inject = ['$stateProvider']

export default setStates
