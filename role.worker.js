const bomba_constants = require('bomba_constants');
var role_renew = require('role.renew');
var role_harvester = require('role.harvester');
var role_upgrader = require('role.upgrader');
var role_builder = require('role.builder');

var role_worker = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if ( ( ( creep.ticksToLive <= 150 || creep.memory.role == bomba_constants.ROLE_RENEWER ) && creep.memory.tier >= creep.room.memory.tier ) && worker.length <= bomba_constants.TEMPORARY_VC ) {
      role_renew.run(creep);
      return;
    }

    if (creep.memory.role == bomba_constants.ROLE_HARVESTER)
      role_harvester.run(creep);
    else if (creep.memory.role == bomba_constants.ROLE_UPGRADER)
      role_upgrader.run(creep);
    else if (creep.memory.role == bomba_constants.ROLE_BUILDER)
      role_builder.run(creep)
  }
}


module.exports = role_worker;
