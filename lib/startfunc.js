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

        if (cfg.tasktype == 'dayclock') {
            taskd.addTask_DayClock(curtaskchain, cfg.clock);
        }
        else if (cfg.tasktype == 'dayclocktimer') {
            taskd.addTask_DayClockTimer(curtaskchain, cfg.startclock, cfg.timer, cfg.endclock);
        }

        let tick = 1000;
        if (cfg.hasOwnProperty('tick')) {
            tick = cfg.tick;
        }

        taskd.start(tick);
    }
    else {
        if (funcOnEnd != undefined) {
            funcOnEnd();
        }
    }
}

exports.startTaskChain = startTaskChain;