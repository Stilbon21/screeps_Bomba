var set_room_state = {

  /** @param {Room} room **/
  run: function(room) {
    if ( Game.rooms[room].energyCapacityAvailable > 700 )
      Game.rooms[room].memory.tier = 2;
    else if ( Game.rooms[room].energyCapacityAvailable > 500 )
      Game.rooms[room].memory.tier = 1;
    else
      Game.rooms[room].memory.tier = 0;
  }

}

module.exports = set_room_state;
