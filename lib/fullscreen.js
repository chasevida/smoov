/*
 * Wrap
 * -----------------------------------------------------
 */
var wrap = function () {
  var wrapper = document.getElementById('smoov-wrap');
  if (wrapper) return wrapper;

  var wrapper = document.createElement("div");
  wrapper.id = "smoov-wrap";

  while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
  }

  document.body.appendChild(wrapper);
  return wrapper;
}

/*
 * Fullscreen
 * -----------------------------------------------------
 */
var fullscreen = function () {
  var el = wrap();
  var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
  || el.mozRequestFullScreen || el.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(el);
  }
}

fullscreen();
