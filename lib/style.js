
var currentTheme;

/*
 * Initalise
 * -----------------------------------------------------
 */
var initalise = function () {

  clearThemes();

  if (smoovConfig.theme === currentTheme
    || smoovConfig.close) {
    document.body.classList.remove('smoov');
    removeListeners();
    currentTheme = undefined
  }
  else {
    currentTheme = smoovConfig.theme
    document.body.classList.add('smoov', String(smoovConfig.theme));
    addListeners();
    // addLabelBorders();
    delay(resizeBoard);
    delay(resizePipelineIssues);
  }
}

/*
 * Clear Themes
 * -----------------------------------------------------
 */
var clearThemes = function () {
  document.body.classList.remove('smoov-theme-light', 'smoov-theme-grey', 'smoov-theme-dark');
}

/*
 * Listeners
 * -----------------------------------------------------
 */
var addListeners = function () {
  window.addEventListener('resize', resizeBoards, true);
  window.addEventListener('scroll', debounce(onScroll, 500), true);
}

var removeListeners = function () {
  window.removeEventListener('resize', resizeBoards);
  window.removeEventListener('scroll', debounce);
}

/*
 * Resize Board
 * -----------------------------------------------------
 */
var onScroll = function () {
  resizePipelineIssues();
}

/*
 * Resize Board
 * -----------------------------------------------------
 */
var resizeBoards = function () {
  setTimeout(function() {
    resizeBoard()
  }, 100)
}

var resizeBoard = function () {
  var clientHeight = document.documentElement.clientHeight;
  var zhBoard = document.getElementsByClassName("zh-board")[0];
  if ( ! zhBoard) return;
  zhBoard.style.height = (clientHeight - 110) + 'px';
}

/*
 * Resize Pipelines & Issues
 * -----------------------------------------------------
 */
var resizePipelineIssues = function() {

  var pipelines = document.getElementsByClassName('zhc-pipeline');

  for (var i = 0; i < pipelines.length; i ++) {

    var container = pipelines[i].getElementsByClassName('Grid__innerScrollContainer')[0];
    if (container == undefined) {
      continue
    }

    var issueOuter = pipelines[i].getElementsByClassName('zhc-issue-cards__cell');
    var issueMain = pipelines[i].getElementsByClassName('zhc-issue-card__main');
    var issueMeta = pipelines[i].getElementsByClassName('zhc-issue-card__meta');
    var yOffset = 0;

    for (var j = 0; j < issueMain.length; j ++) {

      var height = 80 + issueMeta[j].clientHeight;
      //var height = 110;
      //console.log(`${j} height: ${height}`)

      // Some strange fix to get past whatever ZenHub is doing
      if (j == issueMain.length - 1) {
        height += 6;
      }

      issueOuter[j].style.height = height + 'px';
      issueOuter[j].style.top = yOffset + 'px';
      yOffset += height;
    }

    container.style.height = yOffset + 'px';
    container.style.maxHeight = yOffset + 'px';
  }
}

var addLabelBorders = function () {

  var labels = document.getElementsByClassName('zhc-label');

  for (var i = 0; i < labels.length; i ++) {
    var color = labels[i].style.backgroundColor;
    var lum = currentTheme == 'smoov-theme-dark' ? -0.5 : 0.5;
    color = rgbToHex(color);
    color = luminance(color, lum);
    var style = `4px solid ${color}`;
    labels[i].style.borderBottom = style;
    console.log(color);
  }
}

/*
 * Utilities
 * -----------------------------------------------------
 */
var debounce = function (fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var delay = function (fn, threshhold) {
  setTimeout(fn, threshhold || 100);
}

var rgbToHex = function (color) {
  if (color.charAt(0) === "#") {
    return color;
  }
  var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
    r = parseInt(nums[2], 10).toString(16),
    g = parseInt(nums[3], 10).toString(16),
    b = parseInt(nums[4], 10).toString(16);
  return "#"+ (
    (r.length == 1 ? "0"+ r : r) +
    (g.length == 1 ? "0"+ g : g) +
    (b.length == 1 ? "0"+ b : b)
  );
}

var luminance = function (hex, lum) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

/*
 * Start
 * -----------------------------------------------------
 */
initalise();
