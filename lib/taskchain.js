"use strict";

const { Task } = require('./task');

class TaskChain extends Task {
    constructor(nameid) {
        super(nameid);

        this.lstTask = [];
        this.lstEndTask = [];
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
                task.setFunc(undefined, () => { this.onTaskEnd(task); }, undefined, undefined,
                    undefined, undefined, undefined);

                task.start();
            }
        }
    }

    onStart() {
        super.onStart();

        this.restart();
        this.startTask();
    }

    onTaskEnd(task) {
        if (this.lstTask.length > 0) {
            this.lstEndTask.push(task);

            this.lstTask.splice(0, 1);
        }

        this.startTask();
    }

    restart() {
        // if (!this.isCanStart()) {
        //     return ;
        // }

        for (let ii = 0; ii < this.lstEndTask.length; ++ii) {
            this.pushBack(this.lstEndTask[ii]);
        }

        this.lstEndTask = [];
    }
};

exports.TaskChain = TaskChain;