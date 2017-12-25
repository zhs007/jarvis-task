"use strict";

const fs = require('fs');
const { TaskDeamon, TaskFactory, regTaskFactory_Shell, startTaskDeamon } = require('../index');

const cfg = JSON.parse(fs.readFileSync('./samples/taskdeamon.json').toString());

let taskFactory = new TaskFactory('mainfactory');
regTaskFactory_Shell(taskFactory);

startTaskDeamon(cfg, taskFactory);