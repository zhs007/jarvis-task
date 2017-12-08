"use strict";

const { generateUUID } = require('./utils');

class TaskFactory {
    constructor(nameid) {
        this.mapFunc_NewTask = {};

        this.nameid = nameid;
        this.uuid = generateUUID(64);
    }

    addTask(nameid, func) {
        this.mapFunc_NewTask[nameid] = func;
    }

    newTask(nameid) {
        return this.mapFunc_NewTask[nameid]();
    }
};

exports.TaskFactory = TaskFactory;