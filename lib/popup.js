

var goFullscreen = function () {
  chrome.tabs.executeScript(null, {file: "lib/fullscreen.js"});
}

var toggleSmoov = function () {
  chrome.tabs.executeScript(null, {file: "lib/style.js"});
}


var getConfig = function (config) {

  try {
    var smoovConfig = JSON.stringify(config);
  }
  catch (err) {
    return {}
  }
  return smoovConfig
}

var updateOptions = function (config) {
  var smoovConfig = getConfig(config)

  chrome.tabs.executeScript(null, {
    code: `var smoovConfig = ${smoovConfig}`
  }, toggleSmoov);
}

var goLight = function () {
  updateOptions({ theme: 'smoov-theme-light' });
}

var goGrey = function () {
  updateOptions({ theme: 'smoov-theme-grey' });
}

var goDark = function () {
  updateOptions({ theme: 'smoov-theme-dark' });
}

var close = function () {
  updateOptions({ close: true });
}

document.addEventListener('DOMContentLoaded', function () {

  var themeLightBtn = document.getElementById("theme-light");
  themeLightBtn.addEventListener('click', goLight);

  var themeGreyBtn = document.getElementById("theme-grey");
  themeGreyBtn.addEventListener('click', goGrey);

  var themeDarkBtn = document.getElementById("theme-dark");
  themeDarkBtn.addEventListener('click', goDark);

  var fullscreenBtn = document.getElementById("fullscreen");
  fullscreenBtn.addEventListener('click', goFullscreen);

  var closeBtn = document.getElementById("close");
  closeBtn.addEventListener('click', close);
});
