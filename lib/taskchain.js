"use strict";

const { generateUUID } = require('./utils');

class TaskChain {
    constructor() {
        this.uuid = generateUUID(64);

        this.lstTask = [];
    }

    addTask(task) {

    }
};

exports.TaskChain = TaskChain;