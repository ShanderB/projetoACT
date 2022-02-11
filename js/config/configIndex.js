const setStates = function ($stateProvider, $urlRouterProvider) {
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

export default setStates
