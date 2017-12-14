"use strict";

const { TaskChain } = require('./taskchain');
const { TaskDeamon } = require('./taskdeamon');

function startTaskChain(cfg, taskfactory, funcOnEnd) {
    if (cfg.hasOwnProperty('nameid') && cfg.hasOwnProperty('taskchain')) {
        let curtaskchain = new TaskChain(cfg.nameid);
        let taskd = new TaskDeamon();

        let lst = cfg.taskchain;
        for (let ii = 0; ii < lst.length; ++ii) {
            let curnameid = lst[ii];
            if (taskfactory.hasTask(curnameid)) {
                curtaskchain.pushBack(taskfactory.newTask(curnameid, cfg[curnameid]));
            }
        }

        curtaskchain.setFunc(undefined, () => {
            if (funcOnEnd != undefined) {
                funcOnEnd();
            }
        }, undefined, undefined, undefined, undefined, undefined);

        // curtaskchain.start();

        taskd.addTaskChain_DayClock(curtaskchain, cfg.clock);
        taskd.start(1000);
    }
    else {
        if (funcOnEnd != undefined) {
            funcOnEnd();
        }
    }
}

exports.startTaskChain = startTaskChain;