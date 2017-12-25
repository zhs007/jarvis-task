"use strict";

const { generateUUID } = require('./utils');

class TaskFactory {
    constructor(nameid) {
        this.mapFunc_NewTask = {};

        this.nameid = nameid;
        this.uuid = generateUUID(64);
    }

    // newTask(taskfactory, cfg)
    regTask(nameid, func) {
        this.mapFunc_NewTask[nameid] = func;
    }

    newTask(nameid, cfg) {
        return this.mapFunc_NewTask[nameid](this, cfg);
    }

    hasTask(nameid) {
        return this.mapFunc_NewTask.hasOwnProperty(nameid);
    }
};

exports.TaskFactory = TaskFactory;