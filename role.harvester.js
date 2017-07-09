const bomba_constants = require('bomba_constants');
var worker_go_to_idle = require('creep_common_functions');
var harvest = require('worker_function.harvest');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var role_harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

      if (creep.memory.state == bomba_constants.STATE_NONE)
        creep.memory.state = bomba_constants.STATE_HARVESTING;

        if ( creep.memory.state == bomba_constants.STATE_HARVESTING ) {
            harvest.run(creep);
            if (creep.carry.energy == creep.carryCapacity)
              creep.memory.state = bomba_constants.STATE_OFFLOADING;
        } else {
            var target = creep.pos.findClosestByPath( FIND_MY_STRUCTURES,
                                                      {filter: (structure) => ( structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION ) &&
                                                                                structure.energy < structure.energyCapacity });
            if (target == null) {
              target = creep.pos.findClosestByPath( FIND_MY_STRUCTURES,
                                                        {filter: (structure) => ( structure.structureType == STRUCTURE_CONTAINER ) &&
                                                                                  structure.energy < structure.energyCapacity });
              if (target == null)
                worker_go_to_idle.run(creep);
            }


            if ( creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE )
                creep.moveTo(target);
            if ( creep.carry.energy == 0 )
                worker_go_to_idle.run(creep);
        }
    }
}

module.exports = role_harvester;
