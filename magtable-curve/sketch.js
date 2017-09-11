var data;

var list;
var table;

function preload() {
  data = loadJSON("magformers.json");
}

function setup() {
  noCanvas();
  console.log(data);
  list = select("#list");
  table = select("#table");

  var models = data.models;
  var sets = data.sets;

  for (var i = 0; i < sets.length; i++) {
    var set = sets[i];
    var name = set.name;

    var li = createElement("li", name);
    li.parent(list);
  }

  for (var i = 0; i < models.length; i++) {
    var model = models[i];
    var name = model.name;

    var tr = createElement("tr");
    tr.parent(table);

    var td = createElement("td", name);
    td.parent(tr);

    var keys = Object.keys(model);

    var td = createElement("td");

    for (var j = 1; j < keys.length; j++) {
      var key = keys[j];
      var name = format(key);
      var value = model[key];
      var string = name + ": " + value;

      if (value > 0) {
        var div = createDiv(string);
        div.parent(td);
      }
    }

    td.parent(tr);
  }
}
