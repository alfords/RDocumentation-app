// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// Source: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


$(document).ready(function() {
  var searchContainer = $('.search'),
  searchInput = $('.search input'),
  searchResultsPane = $('.search .results');

  searchInput.keyup(debounce(function(){
    console.log(searchInput.val());
    searchResultsPane.show();
  }, 300));

  $(document).click(function(event) {
      if(!$(event.target).closest(searchContainer).length &&
         !$(event.target).is(searchContainer)) {
          if(searchResultsPane.is(":visible")) {
            searchResultsPane.hide();
          }
      }
  })
});