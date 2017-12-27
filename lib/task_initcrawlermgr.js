"use strict";

const { Task } = require('./task');
const { logger } = require('./util');
const async = require('async');
const { CrawlerMgr, HeadlessChromeMgr } = require('crawlercore');
const { JARVISTASK_NAMEID_INITCRAWLERMGR, setLogger } = require('./taskdef');

class Task_InitCrawlerMgr extends Task {
    constructor(taskfactory, cfg) {
        super(taskfactory, JARVISTASK_NAMEID_INITCRAWLERMGR, cfg);
    }

    onStart() {
        super.onStart();

        setLogger(logger);

        let arrhc = [];
        if (this.cfg.hasOwnProperty('headlesschrome')) {
            for (let hccfgname in this.cfg.headlesschrome) {
                HeadlessChromeMgr.singleton.addHeadlessChrome(hccfgname, this.cfg.headlesschrome[hccfgname]);

                arrhc.push(hccfgname);
            }
        }

        for (let dbcfgname in this.cfg.mysqlcfg) {
            CrawlerMgr.singleton.addMysqlCfg(dbcfgname, this.cfg.mysqlcfg[dbcfgname]);
        }

        for (let crawlerkey in this.cfg.crawlercfg) {
            CrawlerMgr.singleton[crawlerkey] = this.cfg.crawlercfg[crawlerkey];
        }

        CrawlerMgr.singleton.init().then(() => {
            async.eachSeries(arrhc, (val, next) => {
                HeadlessChromeMgr.singleton.getHeadlessChrome(val).then(() => {
                    next();
                });
            }, (err) => {
                this.onEnd();
            });
        });
    }
};

function regTaskFactory_InitCrawlerMgr(taskfactory) {
    taskfactory.regTask(JARVISTASK_NAMEID_INITCRAWLERMGR, (factory, cfg) => {
        return new Task_InitCrawlerMgr(factory, cfg);
    });
}

exports.Task_InitCrawlerMgr = Task_InitCrawlerMgr;
exports.regTaskFactory_InitCrawlerMgr = regTaskFactory_InitCrawlerMgr;