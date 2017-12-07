"use strict";

const { Task } = require('./lib/task');
const { generateUUID } = require('./lib/utils');

exports.Task = Task;

exports.generateUUID = generateUUID;