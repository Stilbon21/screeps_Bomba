const bomba_constants = require('bomba_constants');
var worker_go_to_idle = require('creep_common_functions');
var harvest = require('worker_function.harvest');

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var role_upgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.state == bomba_constants.STATE_NONE)
          creep.memory.state = bomba_constants.STATE_HARVESTING;
        if (creep.carry.energy == 0 && creep.memory.state == bomba_constants.STATE_UPGRADING) {
          worker_go_to_idle.run(creep);
          return;
        }

        if (creep.carry.energy == creep.carryCapacity )
            creep.memory.state = bomba_constants.STATE_GOING_TO_UPGRADE;

        if (creep.memory.state == bomba_constants.STATE_HARVESTING) {
            harvest.run(creep);
        } else if ( creep.memory.state == bomba_constants.STATE_GOING_TO_UPGRADE || creep.memory.state == bomba_constants.STATE_UPGRADING) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);
            else
                if ( creep.carry.energy == 0 )
                   worker_go_to_idle.run(creep);
                else
                  creep.memory.state = bomba_constants.STATE_UPGRADING;
        }

    }

}

module.exports = role_upgrader;
