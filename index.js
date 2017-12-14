"use strict";

const { Task } = require('./lib/task');
const { TaskChain } = require('./lib/taskchain');
const { TaskDeamon } = require('./lib/taskdeamon');
const { TaskFactory } = require('./lib/taskfactory');
const { generateUUID, hash_md5 } = require('./lib/utils');
const { startTaskChain } = require('./lib/startfunc');

exports.Task = Task;
exports.TaskChain = TaskChain;
exports.TaskFactory = TaskFactory;
exports.TaskDeamon = TaskDeamon;

exports.generateUUID = generateUUID;
exports.hash_md5 = hash_md5;

exports.startTaskChain = startTaskChain;

const { JARVISTASK_NAMEID_INITCRAWLERMGR } = require('./lib/taskdef');
const { regTaskFactory_InitCrawlerMgr } = require('./lib/task_initcrawlermgr');

exports.JARVISTASK_NAMEID_INITCRAWLERMGR = JARVISTASK_NAMEID_INITCRAWLERMGR;
exports.regTaskFactory_InitCrawlerMgr = regTaskFactory_InitCrawlerMgr;

const crawlercore = require('crawlercore');
exports.crawlercore = crawlercore;
