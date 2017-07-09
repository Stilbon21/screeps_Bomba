const bomba_constants = require('bomba_constants');

var worker_controller = {
  run: function() {

    var own_rooms = _.filter(Game.rooms, (room) => room.controller.my == true) // hasznald inkabb a fofunkciosat
    for (var room_name in own_rooms) {
      var workers = _.filter(Game.creeps, ((creep) => creep => room.name == own_rooms[room_name]) &&
                                                  ((creep) => creep.memory.creep_type == bomba_constants.CREEP_TYPE_WORKER) );
      if ( workers.length != 0 ) // against divide by zero
        var number_of_workers = workers.length;
      else
        var number_of_workers = 1;

      console.log ( workers.length );

      var idle_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_IDLE);

      var harvester_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_HARVESTER);
      var harvester_count = harvester_workers.length;

      var updater_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_UPGRADER);
      var updater_count = updater_workers.length;

      var builder_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_BUILDER);
      var builder_count = builder_workers.length;

      var renew_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_RENEWER);

      var repairer_workers = _.filter(workers, (worker) => worker.memory.role == bomba_constants.ROLE_REPAIRER);
      var repairer_count = builder_workers.length;

      var walls = own_rooms[room_name].find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_WALL } } );
      var structures = own_rooms[room_name].find(FIND_MY_STRUCTURES);
      console.log(structures);

      if (own_rooms[room_name].energyCapacityAvailable != 0 )
        var room_energy_ratio = own_rooms[room_name].energyAvailable / ( own_rooms[room_name].energyCapacityAvailable / 100 );
      else
        console.log("ERROR: dividing by zero!");

      var construction_sites = _.filter(Game.constructionSites, (construction_site) => construction_site.room == own_rooms[room_name]);

      for(var worker in idle_workers) {
        if ( ( 100 - room_energy_ratio > harvester_count / (number_of_workers / 100) ) || number_of_workers < ( bomba_constants.TEMPORARY_VC - ( bomba_constants.TEMPORARY_VC / 4 ) ) )
          idle_workers[worker].memory.role = bomba_constants.ROLE_HARVESTER;
        else if ( construction_sites.length != 0 )
          idle_workers[worker].memory.role = bomba_constants.ROLE_BUILDER;
        else
          idle_workers[worker].memory.role = bomba_constants.ROLE_UPGRADER;
      }

      console.log();
      console.log("total_energy:    " + own_rooms[room_name].energyAvailable + "/" + own_rooms[room_name].energyCapacityAvailable);
      console.log("tier:            " + own_rooms[room_name].memory.tier);
      console.log("worker count:    " + number_of_workers);
      console.log("----------------------");
      console.log("idle_count:      " + idle_workers.length);
      console.log("renew_count:     " + renew_workers.length);
      console.log("harvester_count: " + harvester_count);
      console.log("updater_count:   " + updater_count);
      console.log("builder_count:   " + builder_count);

    }
  }

};

module.exports = worker_controller;
