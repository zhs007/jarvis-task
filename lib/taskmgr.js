"use strict";

class TaskMgr{
    constructor() {
        this.mapTaskGroup = {};
    }
};

TaskMgr.singleton = new TaskMgr();

exports.TaskMgr = TaskMgr;