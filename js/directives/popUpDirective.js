const popUpDirectiveName = 'popup'

const popUpDirective = function () {
  const linker = function (scope, element) {
    scope.$on('contentLoaded', function () {
      element.addClass('show')
    })
    scope.close = function () {
      element.removeClass('show')
    }
  }
  return {
    restrict: 'E',
    link: linker
  }
}

export { popUpDirective, popUpDirectiveName }
