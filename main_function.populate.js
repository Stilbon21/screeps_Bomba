const bomba_constants = require('bomba_constants');

var populate = {
    run: function() {
      for (var spawn in Game.spawns) {
        if ( Game.spawns[spawn].canCreateCreep(MOVE) != ERR_BUSY ) {
            var worker = _.filter(Game.creeps, (creep) => creep.memory.creep_type == bomba_constants.CREEP_TYPE_WORKER);
            if ( worker.length == 0) {
              Game.spawns[spawn].createCreep( [WORK, CARRY, MOVE], { creep_type: bomba_constants.CREEP_TYPE_WORKER,
                                                                     role: bomba_constants.ROLE_IDLE,
                                                                     state: bomba_constants.STATE_NONE,
                                                                     target_site_id: null,
                                                                     tier: 0 } );
              return;
            }
            if ( worker.length < bomba_constants.TEMPORARY_VC )
              if ( Game.spawns[spawn].room.energyCapacityAvailable > 700 /*&& Game.spawns[spawn].room.energyAvailable >= 600*/ )
                Game.spawns[spawn].createCreep( [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                                                { creep_type: bomba_constants.CREEP_TYPE_WORKER,
                                                  role: bomba_constants.ROLE_IDLE,
                                                  state: bomba_constants.STATE_NONE,
                                                  target_site_id: null,
                                                  tier: 2 } );
              else if ( Game.spawns[spawn].room.energyCapacityAvailable > 500 /*&& Game.spawns[spawn].room.energyAvailable >= 450*/ )
                Game.spawns[spawn].createCreep( [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
                                                { creep_type: bomba_constants.CREEP_TYPE_WORKER,
                                                  role: bomba_constants.ROLE_IDLE,
                                                  state: bomba_constants.STATE_NONE,
                                                  target_site_id: null,
                                                  tier: 1 } );
              else
                Game.spawns[spawn].createCreep( [WORK, CARRY, MOVE], { creep_type: bomba_constants.CREEP_TYPE_WORKER,
                                                                       role: bomba_constants.ROLE_IDLE,
                                                                       state: bomba_constants.STATE_NONE,
                                                                       target_site_id: null,
                                                                       tier: 0 } );
        }
      }
    }
};

module.exports = populate;
