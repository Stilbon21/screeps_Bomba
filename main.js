const bomba_constants = require('bomba_constants');
var populate = require('main_function.populate');
var set_room_state = require('main_function.set_room_state');
var worker_controller = require('worker_controller');
var role_worker = require('role.worker');
// git test
module.exports.loop = function () {

  for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
          delete Memory.creeps[name];
          //console.log('Clearing non-existing creep memory:', name);
      }
  }

  for ( var room in Game.rooms )
    if ( Game.rooms[room].my = true )
      set_room_state.run(room);

  worker_controller.run();

  populate.run();
  for (var creep_name in Game.creeps) {
      var creep = Game.creeps[creep_name];
      if (creep.memory.creep_type == bomba_constants.CREEP_TYPE_WORKER)
          role_worker.run(creep);
  }

}
