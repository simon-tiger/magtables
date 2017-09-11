var data;
var list;
var table;
var tableDiv;
var interactiveDiv;
// var modelDropdown;
var mode;

function preload() {
  data = loadJSON("magformers.json");
}

function setup() {
  noCanvas();
  table = select("#table");
  list = select("#list");
  mode = select("#mode");
  tableDiv = select("#static");
  interactiveDiv = select("#interactive");
  changeMode();
  mode.changed(changeMode);
  // modelDropdown = select("#model");

  var models = data.models;
  var sets = data.sets;

  for (var i = 0; i < sets.length; i++) {
    var set = sets[i];
    var name = set.name;

    var li = createElement("li");
    li.html(name);
    li.parent(list);
  }

  for (var i = 0; i < models.length; i++) {
    var model = models[i];

    var name = model.name;

    var modelDropdown = select("#model");
    modelDropdown.option(name);

    var tr = createElement("tr");
    tr.parent(table);

    var td = createElement("td");
    td.html(name);
    td.parent(tr);

    var keys = Object.keys(model);

    var td = createElement("td");

    for (var j = 1; j < keys.length; j++) {
      var key = keys[j];
      var count = model[key];
      key = key.replace(/_/, " ");
      key = key.replace(/\b\w/g, capitalize);
      var total = key.length;
      if (key.charAt(total-1) == "s") {
        key = key + "e";
      }
      key = key + "s";

      function capitalize(l) {
        return l.toUpperCase();
      }

      if (count > 0) {
        var div = createDiv(key + ": " + count);
        div.parent(td);
      }
    }

    td.parent(tr);

    var sets = data.sets;

    var td = createElement("td");

    for (var j = 0; j < sets.length; j++) {
      var set = sets[j];

      var keys = Object.keys(set);
      var canUse = modelInSet(model, set);

      if (canUse) {
        var name = set.name;
        var div = createDiv(name);
        div.parent(td);
      }
    }

    td.parent(tr);
  }
}

function changeMode() {
  if (mode.value() == "static") {
    tableDiv.show();
    interactiveDiv.hide();
  } else {
    tableDiv.hide();
    interactiveDiv.show();
  }
}
