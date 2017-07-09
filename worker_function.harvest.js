var harvest = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if ( creep.memory.target_site_id == null ) {
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if ( source != null )
        creep.memory.target_site_id = source.id;
    } else
      source = creep.memory.target_site_id;

    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);

  }

}

module.exports = harvest;
