"use strict";

const { Task } = require('./task');
const { JARVISTASK_NAMEID_CHAIN } = require('./taskdef');

class Task_Chain extends Task {
    constructor(taskfactory, cfg) {
        super(taskfactory, JARVISTASK_NAMEID_CHAIN, cfg);

        this.lstTask = [];
        this.lstEndTask = [];

        this._initWithConfig(taskfactory, cfg);
    }

    _initWithConfig(taskfactory, cfg) {
        if (cfg.hasOwnProperty('taskchain')) {
            let lst = cfg.taskchain;
            for (let ii = 0; ii < lst.length; ++ii) {
                let curnameid = lst[ii];
                if (taskfactory.hasTask(curnameid)) {
                    this.pushBack(taskfactory.newTask(curnameid, cfg[curnameid]));
                }
            }
        }
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

function regTaskFactory_Chain(taskfactory) {
    taskfactory.regTask(JARVISTASK_NAMEID_CHAIN, (factory, cfg) => {
        return new Task_Chain(factory, cfg);
    });
}

exports.Task_Chain = Task_Chain;
exports.regTaskFactory_Chain = regTaskFactory_Chain;