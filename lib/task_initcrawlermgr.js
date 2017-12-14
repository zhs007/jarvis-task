"use strict";

const { Task } = require('jarvis-task');
const async = require('async');
const { CrawlerMgr, HeadlessChromeMgr } = require('crawlercore');
const { JARVISTASK_NAMEID_INITCRAWLERMGR } = require('./taskdef');

class Task_InitCrawlerMgr extends Task {
    constructor(cfg) {
        super(JARVISTASK_NAMEID_INITCRAWLERMGR);

        this.cfg = cfg;
    }

    onStart() {
        super.onStart();

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
    taskfactory.regTask(JARVISTASK_NAMEID_INITCRAWLERMGR, (cfg) => {
        return new Task_InitCrawlerMgr(cfg);
    });
}

exports.Task_InitCrawlerMgr = Task_InitCrawlerMgr;
exports.regTaskFactory_InitCrawlerMgr = regTaskFactory_InitCrawlerMgr;