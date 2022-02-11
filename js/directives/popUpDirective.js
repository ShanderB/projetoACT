const popUpDirectiveName = 'popup'

const popUpDirective = function() {
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
}

export {popUpDirective, popUpDirectiveName}
