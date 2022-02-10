var app = angular.module('Comics',['ui.router','infinite-scroll']);

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('index', {
		url: '',
		controler: 'MainCtrl',
		templateUrl: 'templates/character.html'
	})
	.state('index.single', {
		url: '/:id',
		templateUrl: 'templates/characterPopUp.html',
		controller: 'SingleCharacter'
	});
});

app.controller('MainCtrl',function($scope, ComicBooks) {	
	$scope.vm = new ComicBooks.LoadMore($scope);
});

app.controller('SingleCharacter', function($scope, $rootScope, $stateParams, ComicBooks, $window) {
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
		//Not quite what I am looking for...?
		$rootScope.$broadcast('contentLoaded');
	});
});
//Works to prevent scrolling window
app.value('$anchorScroll', angular.noop);

app.directive('popup',function() {
	var linker = function(scope,element,attrs) {
		scope.$on('contentLoaded',function() {
			element.addClass('show');
		});
		scope.close = function() {
			element.removeClass('show');
		};
	};
	return {
		restrict: 'E',
		link: linker
	};
});

app.factory('ComicBooks',function($http,$q) {
	var publicKey = '5a237863b3cc2061003cbbc4fe20dc06';
	var baseUrl = 'http://gateway.marvel.com/v1/';
	var limit = 50;

	var find = function() {
		var def = $q.defer();
		var url = baseUrl + 'public/characters?limit='+ limit +'&apikey=' + publicKey + '&hash=bd4b447a65ef5d6b174f87cf9db6d2db&ts=1';
		$http.get(url).success(def.resolve).error(def.reject);

		return def.promise;
	};
	var findOne = function(id) {
		var def = $q.defer();
		var url = baseUrl + 'public/characters/' + id +'?apikey=' + publicKey + '&hash=bd4b447a65ef5d6b174f87cf9db6d2db&ts=1';
		$http.get(url).success(def.resolve).error(def.reject);

		return def.promise;
	};
	var findNext = function(offset) {
		var def = $q.defer();
		var url = baseUrl + 'public/characters?limit=' + limit +'&offset=' + (limit*offset) + '&apikey=' + publicKey + '&hash=bd4b447a65ef5d6b174f87cf9db6d2db&ts=1';
		$http.get(url).success(def.resolve).error(def.reject);

		return def.promise;
	};
	var LoadMore = function($scope) {
		this.offset = 0;
		this.busy = false;
		this.characters = [];
		this.load = function() {
			if(this.busy) {
				return;
			}
			this.busy = true;
			findNext(this.offset).then(function(results) {
				var chars = results.data.results;
				chars.forEach(function(item) {
					this.characters.push(item);
				}.bind(this));
				this.offset++;
				this.busy = false;
			}.bind(this));
		}.bind(this);
	};

	return {
		find: find,
		findOne: findOne,
		LoadMore: LoadMore
	};
});