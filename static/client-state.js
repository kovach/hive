var respJSON = function(req) {
  return JSON.parse(req.responseText);
}

var send_init = function() {
  var handler = function(req) {
    return function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          var json = respJSON(req);
          world.init_world(json.objects);

        } else {
          console.log('error initializing!');
        }
      }
    }
  }

  send_data('init', handler, {});
}


var response_handler = function(req) {
  return function() {
    //TODO check for server error
    if (req.readyState == 4) {
      if (req.status == 200) {
        end_time = new Date().getTime();
        console.log((end_time - start_time));
        console.log('req: ', req);

        var response = respJSON(req);
        console.log('valid moves: ', response.moves);
      } else {
        console.log('ERROR: ', req.responseText);
      }
    }
  }
}


// THIS MODIFIES THE MSG OBJECT
var send_data = function(stub, handler, msg) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = handler(req);

  var id = _.uniqueId();
  msg._id = id;
  var data = JSON.stringify(msg);

  req.open("POST", '/' + stub + '?data=' + data, true);
  req.send();

  return id;
}

var start_time;
var end_time;

send_msg = function(msg) {
  start_time = new Date().getTime();
  send_data('send', response_handler, msg);
}
