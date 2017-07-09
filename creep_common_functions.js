const bomba_constants = require('bomba_constants');

var worker_go_to_idle = {

  /** @param {Creep} creeps **/
  run: function(creep) {
    creep.memory.role = bomba_constants.ROLE_IDLE;
    creep.memory.state = bomba_constants.STATE_NONE;
    if ( creep.memory.creep_type == bomba_constants.CREEP_TYPE_WORKER)
      creep.target_site_id = null;
  }
}



module.exports = worker_go_to_idle;
