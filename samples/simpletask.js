"use strict";

const { Task, TaskDeamon, TaskChain, TaskFactory } = require('../index');

const TASK_NAMEID_HELLOWORLD = 'helloworld';

class Task_HelloWorld extends Task {
    constructor(cfg) {
        super(TASK_NAMEID_HELLOWORLD, cfg);
    }

    onStart() {
        super.onStart();

        console.log('hello world.');

        this.onEnd();
    }
};

let taskFactory = new TaskFactory('mainfactory');
taskFactory.regTask(TASK_NAMEID_HELLOWORLD, (cfg) => {
    return new Task_HelloWorld(cfg);
});

let curtaskchain = new TaskChain('mainchain');
let taskd = new TaskDeamon();

curtaskchain.pushBack(taskFactory.newTask(TASK_NAMEID_HELLOWORLD, {}));
taskd.addTask_DayClock(curtaskchain, '10:00:00');

taskd.start(1000);