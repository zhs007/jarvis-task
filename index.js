"use strict";

const { Task } = require('./lib/task');
const { TaskChain } = require('./lib/taskchain');
const { TaskDeamon } = require('./lib/taskdeamon');
const { TaskFactory } = require('./lib/taskfactory');
const { generateUUID, hash_md5 } = require('./lib/utils');
const { startTaskChain, startTaskDeamon } = require('./lib/startfunc');

exports.Task = Task;
exports.TaskChain = TaskChain;
exports.TaskFactory = TaskFactory;
exports.TaskDeamon = TaskDeamon;

exports.generateUUID = generateUUID;
exports.hash_md5 = hash_md5;

exports.startTaskChain = startTaskChain;
exports.startTaskDeamon = startTaskDeamon;

const { JARVISTASK_NAMEID_INITCRAWLERMGR, JARVISTASK_NAMEID_SHELL } = require('./lib/taskdef');
const { regTaskFactory_InitCrawlerMgr } = require('./lib/task_initcrawlermgr');
const { regTaskFactory_Shell } = require('./lib/task_shell');

exports.JARVISTASK_NAMEID_INITCRAWLERMGR = JARVISTASK_NAMEID_INITCRAWLERMGR;
exports.JARVISTASK_NAMEID_SHELL = JARVISTASK_NAMEID_SHELL;

exports.regTaskFactory_InitCrawlerMgr = regTaskFactory_InitCrawlerMgr;
exports.regTaskFactory_Shell = regTaskFactory_Shell;

const crawlercore = require('crawlercore');
exports.crawlercore = crawlercore;
