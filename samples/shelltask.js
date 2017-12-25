"use strict";

const { Task, TaskDeamon, TaskChain, TaskFactory, regTaskFactory_Shell, JARVISTASK_NAMEID_SHELL } = require('../index');

let taskFactory = new TaskFactory('mainfactory');
regTaskFactory_Shell(taskFactory);
let curtask = taskFactory.newTask(JARVISTASK_NAMEID_SHELL, {filename: './samples/shell.js'});
let taskd = new TaskDeamon();

taskd.addTask_DayClock(curtask, '10:00:00');

taskd.start(1000);