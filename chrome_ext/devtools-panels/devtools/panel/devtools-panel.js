var hidePeople = 0;
var showDefault = 1;
var showPageView = 1;

var defaults = ["$os",
  "$browser",
  "$referrer",
  "$referring_domain",
  "$current_url",
  "$browser_version",
  "$screen_height",
  "$screen_width",
  "$lib_version",
  "$insert_id",
  "time",
  "distinct_id",
  "$device_id",
  "$initial_referrer",
  "$initial_referring_domain",
  "$user_id",
  "token",
  "mp_lib"
];


document.getElementById('clear').addEventListener("click", function () {
  const myNode = document.getElementById("list");
  myNode.innerHTML = "";
});

document.getElementById('clear').addEventListener("mousedown", function () {
  document.getElementById("clear").className = "button-pressed";
});

document.getElementById('clear').addEventListener("mouseup", function () {
  document.getElementById("clear").className = "";
});

document.getElementById('people').addEventListener("click", function () {
  var nodes = document.getElementsByClassName("listItem people");
  var style = "";
  if (hidePeople === 0) {
    style = "display: none";
    hidePeople = 1;
  } else {
    style = "display: block; list-style: circle;";
    hidePeople = 0;
  }
  for (var j = 0; j < nodes.length; j++) {
    nodes[j].setAttribute('style', style);
  }
  document.getElementById('people').classList.toggle("button-pressed");
});

document.getElementById('default').addEventListener("click", function () {
  var nodes = document.getElementsByClassName("bullett default");
  var style = "";
  if (showDefault === 0) {
    style = "display: none";
    showDefault = 1;
  } else {
    style = "display: block";
    showDefault = 0;
  }
  for (var j = 0; j < nodes.length; j++) {
    nodes[j].setAttribute('style', style);
  }
  document.getElementById('default').classList.toggle("button-pressed");
});

document.getElementById('page').addEventListener("click", function () {
  var nodes = document.getElementsByClassName("listItem page");
  var style = "";
  if (showPageView === 0) {
    style = "display: none";
    showPageView = 1;
  } else {
    style = "display: block; list-style: circle;";
    showPageView = 0;
  }
  for (var j = 0; j < nodes.length; j++) {
    nodes[j].setAttribute('style', style);
  }
  document.getElementById('page').classList.toggle("button-pressed");
});

function getTime () {
  var now = new Date();
  var time = format(now.getHours(), 2) + ":" + format(now.getMinutes(), 2) + ":" + format(now.getSeconds(), 2) + ":" + format(now.getMilliseconds(), 3);
  return time;
}

function format(string, length) {
  string = string + "";
  if (string.length === length) {
    return string;
  }
  var diff = length - string.length;
  for (var k = 0; k < diff; k++) {
    string = '0' + string;
  }
  return string;
}

function listener(request) {
  try {
    if (request.request.url.indexOf("mixpanel.com/track") > -1) {
      var x = atob(request.request.postData.params[0].value);
      var y = JSON.parse(x);
      if (y && y.event && y.event !== "$web_event" && y.event !== "") {
        var li = document.createElement("li");
        if (y.event === "mp_page_view") {
          li.className = "listItem page";
          if (showPageView === 0) {
            liIterable.setAttribute('style', "display: block");
          }
        } else {
          li.className = "listItem";
        }
        var span = document.createElement("span");
        var span2 = document.createElement("span");
        var span3 = document.createElement("span");
        span2.appendChild(document.createTextNode(y.event));
        span3.appendChild(document.createTextNode(getTime()));
        span3.className = "span3";
        span.appendChild(span2);
        span.appendChild(span3);
        span.className = "caret";
        span.addEventListener("click", function (e) {
          this.parentElement.querySelector(".nested").classList.toggle("active");
          this.classList.toggle("caret-down");
          e.stopPropagation();
        });
        var ul = document.createElement("ul");
        ul.className = "nested";
        Object.keys(y.properties).forEach(el => {
          var liIterable = document.createElement("li");
          liIterable.appendChild(document.createTextNode(el + " : " + y.properties[el]));
          if (defaults.indexOf(el) > -1) {
            liIterable.className = "bullett default";
            if (showDefault === 0) {
              liIterable.setAttribute('style', "display: block");
            }
          } else {
            liIterable.className = "bullett";
          }
          ul.appendChild(liIterable);
        });
        span.appendChild(ul);
        li.appendChild(span);
        var div = document.createElement("div");
        div.className = "hr";
        li.appendChild(div);
        list.prepend(li);
      }
    } else if (request.request.url.indexOf("mixpanel.com/engage") > -1) {
      var x = atob(request.request.postData.params[0].value);
      var y = JSON.parse(x);
      if (y) {
        var li = document.createElement("li");
        li.className = "listItem people";
        if (hidePeople === 1) {
          li.setAttribute('style', "display: none");
        }
        var span = document.createElement("span");
        var span2 = document.createElement("span");
        var span3 = document.createElement("span");
        span2.appendChild(document.createTextNode("MP People Prop"));
        span3.appendChild(document.createTextNode(getTime()));
        span3.className = "span3";
        span.appendChild(span2);
        span.appendChild(span3);
        span.className = "caret";
        span.addEventListener("click", function (e) {
          this.parentElement.querySelector(".nested").classList.toggle("active");
          this.classList.toggle("caret-down");
          e.stopPropagation();
        });
        var ul = document.createElement("ul");
        ul.className = "nested";
        Object.keys(y.$set).forEach(el => {
          var liIterable = document.createElement("li");
          liIterable.appendChild(document.createTextNode(el + " : " + y.$set[el]));
          if (defaults.indexOf(el) > -1) {
            liIterable.className = "bullett default";
            if (showDefault === 0) {
              liIterable.setAttribute('style', "display: block");
            }
          } else {
            liIterable.className = "bullett";
          }
          ul.appendChild(liIterable);
        });
        span.appendChild(ul);
        li.appendChild(span);
        var div = document.createElement("div");
        div.className = "hr";
        li.appendChild(div);
        list.prepend(li);
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}
chrome.devtools.network.onRequestFinished.addListener(listener);