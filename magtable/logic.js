function objectToCounts(object) {
  var counts = [];
  var keys = Object.keys(object);

  for (var i = 1; i < keys.length; i++) {
    var key = keys[i];
    counts.push(object[key]);
  }

  return counts;
}

function modelInSet(model, set) {
  var modelCounts = objectToCounts(model);
  var setCounts = objectToCounts(set);
  var canUse = true;

  for (var i = 0; i < setCounts.length; i++) {
    var sCount = setCounts[i];
    var mCount = modelCounts[i];

    if (mCount > sCount) {
      canUse = false;
      break;
    }
  }

  if (canUse) {
    return true;
  }
  return false;
}
