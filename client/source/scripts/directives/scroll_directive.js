/**
 *
 * Ng Scroll
 * Stolen from vojtajina
 */
angular.module('scroll-directive', [])
.directive('ngScrolled', function() {
  return function(scope, elm, attr) {
    var raw = elm[0];    
    elm.bind('scroll', function() {
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(attr.ngScrolled);
      }
    });
  };
});
