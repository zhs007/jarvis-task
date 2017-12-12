"use strict";

const shell = require('shelljs');

const { Task } = require('./task');

class ShellTask extends Task {
    constructor(nameid) {
        super(nameid);

        this.lstTask = [];
    }

    pushBack(task) {
        this.lstTask.push(task);
    }

    startTask() {
        if (this.lstTask.length <= 0) {
            this.onEnd();
        }
        else {
            let task = this.lstTask[0];

            if (!task.isRuning()) {
                task.setFunc(undefined, () => { this.onTaskEnd(); }, undefined, undefined,
                    undefined, undefined, undefined);

                task.start();
            }
        }
    }

    onStart() {
        super.onStart();

        this.startTask();
    }

    onTaskEnd() {
        if (this.lstTask.length > 0) {
            this.lstTask.splice(0, 1);
        }

        this.startTask();
    }
};

exports.ShellTask = ShellTask;