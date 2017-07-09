const bomba_constants = require('bomba_constants');
var worker_go_to_idle = require('creep_common_functions');

var role_renew = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.role != bomba_constants.ROLE_RENEWER) {
      creep.memory.role = bomba_constants.ROLE_RENEWER;
      creep.memory.state = bomba_constants.STATE_RENEWING;
      creep.memory.target_site_id = null;
    }

    var spawn = creep.pos.findClosestByPath( FIND_MY_STRUCTURES,
                                             { filter: (structure) => structure.structureType == STRUCTURE_SPAWN } );
    if (spawn == null)
      return;

    if ( creep.pos.getRangeTo( spawn ) > 1 )
      creep.moveTo( spawn );
    else {
      if ( spawn.canCreateCreep(MOVE) != ERR_BUSY )
        if ( spawn.renewCreep( creep ) == ERR_FULL )
          worker_go_to_idle.run(creep);
    }

  }

}

module.exports = role_renew;
