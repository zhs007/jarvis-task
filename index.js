"use strict";

const { Task } = require('./lib/task');
const { Task_Chain, regTaskFactory_Chain } = require('./lib/task_chain');
const { TaskDeamon } = require('./lib/taskdeamon');
const { TaskFactory } = require('./lib/taskfactory');
const { TaskStatistics } = require('./lib/taskstatistics');
const { generateUUID, hash_md5, initDailyRotateFileLog, log, setLogger, formatTimeMs, formatPer } = require('./lib/utils');
const { startTask, startTaskDeamon } = require('./lib/startfunc');

exports.Task = Task;
exports.Task_Chain = Task_Chain;
exports.TaskFactory = TaskFactory;
exports.TaskDeamon = TaskDeamon;
exports.TaskStatistics = TaskStatistics;

exports.generateUUID = generateUUID;
exports.hash_md5 = hash_md5;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.log = log;
exports.setLogger = setLogger;
exports.formatTimeMs = formatTimeMs;
exports.formatPer = formatPer;

exports.startTask = startTask;
exports.startTaskDeamon = startTaskDeamon;

const { JARVISTASK_NAMEID_INITCRAWLERMGR, JARVISTASK_NAMEID_SHELL, JARVISTASK_NAMEID_CHAIN } = require('./lib/taskdef');
const { regTaskFactory_InitCrawlerMgr } = require('./lib/task_initcrawlermgr');
const { regTaskFactory_Shell } = require('./lib/task_shell');

exports.JARVISTASK_NAMEID_INITCRAWLERMGR = JARVISTASK_NAMEID_INITCRAWLERMGR;
exports.JARVISTASK_NAMEID_SHELL = JARVISTASK_NAMEID_SHELL;
exports.JARVISTASK_NAMEID_CHAIN = JARVISTASK_NAMEID_CHAIN;

exports.regTaskFactory_InitCrawlerMgr = regTaskFactory_InitCrawlerMgr;
exports.regTaskFactory_Shell = regTaskFactory_Shell;
exports.regTaskFactory_Chain = regTaskFactory_Chain;

const crawlercore = require('crawlercore');
exports.crawlercore = crawlercore;
