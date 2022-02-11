const findComicControllerName = 'SingleCharacter'

const findComicController = function($scope, $rootScope, $stateParams, ComicBooks, $window) {
	var id = $stateParams.id;
	ComicBooks.findOne(id).then(function(result) {
		var data = result.data.results[0];
		$scope.characterName = data.name;
		$scope.characterUrl = data.urls[0].url;
		$scope.characterImg = data.thumbnail.path + '.' + data.thumbnail.extension;
		var desc = data.description;
		if(desc.length <= 0){
			desc = "No description provided";
		}
		$scope.description = desc;
		$rootScope.$broadcast('contentLoaded');
	});
}


export {findComicController, findComicControllerName}