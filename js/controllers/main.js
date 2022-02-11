const mainsControllerName = 'MainCtrl'

const loadMainController = function ($scope, ComicBooks) {
  $scope.vm = new ComicBooks.LoadMore($scope)
}

export { loadMainController, mainsControllerName }
