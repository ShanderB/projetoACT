const mainsControllerName = 'MainCtrl'

const loadMainController = function ($scope, ComicBooks) {
  $scope.vm = new ComicBooks.LoadMore($scope)
}

loadMainController.$inject = [
  '$scope',
  'ComicBooks'
]

export { loadMainController, mainsControllerName }
