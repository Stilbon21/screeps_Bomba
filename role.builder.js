const bomba_constants = require('bomba_constants');
var worker_go_to_idle = require('creep_common_functions');
var harvest = require('worker_function.harvest');

var role_builder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.state == bomba_constants.STATE_NONE)
          creep.memory.state = bomba_constants.STATE_HARVESTING;

        if (creep.carry.energy == creep.carryCapacity )
            creep.memory.state = bomba_constants.STATE_GO_TO_BUILD;

        if (creep.memory.state == bomba_constants.STATE_HARVESTING) {
            harvest.run(creep);
        } else if ( creep.memory.state == bomba_constants.STATE_GO_TO_BUILD || creep.memory.state == bomba_constants.STATE_BUILDING ) {
            var construction_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
            if (construction_site == null) {
              worker_go_to_idle.run(creep);
              return;
            }
            if ( creep.build( construction_site ) == ERR_NOT_IN_RANGE) {
                creep.moveTo( construction_site.pos );
                creep.memory.state = bomba_constants.STATE_GO_TO_BUILD;
            } else {

              if ( creep.carry.energy == 0 )
                worker_go_to_idle.run(creep);
              else
                creep.memory.state = bomba_constants.STATE_BUILDING;
            }
        }

    }

}

module.exports = role_builder;
