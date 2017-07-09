
// constants to define creep tasks
const bomba_constants = {

    ROLE_IDLE: 0,

    CREEP_TYPE_WORKER: "worker",

    // worker tasks
    ROLE_HARVESTER: "harvester",
    ROLE_UPGRADER: "upgrader",
    ROLE_BUILDER: "builder",
    ROLE_REPAIRER: "repairer",

    // tasks for all
    ROLE_RENEWER: "renew",

    // worker states
    STATE_HARVESTING: "harvesting",
    STATE_GOING_TO_UPGRADE: "going_to_upgrade",
    STATE_UPGRADING: "upgrading",
    STATE_GO_TO_BUILD: "going to build",
    STATE_BUILDING: "building",
    STATE_OFFLOADING: "offloading",
    STATE_REPAIRING: "repairing",

    // states for all
    STATE_RENEWING: "renewing",

    STATE_NONE: "none",


    TEMPORARY_VC: 16,

}

module.exports = bomba_constants;
