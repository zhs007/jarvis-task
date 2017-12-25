"use strict";

// const { Task_Chain } = require('./task_chain');
const { TaskDeamon } = require('./taskdeamon');
// const { JARVISTASK_NAMEID_CHAIN } = require('./taskdef');

// function startTaskChain(cfg, taskfactory, funcOnEnd) {
//     if (cfg.hasOwnProperty('nameid') && cfg.hasOwnProperty('taskchain')) {
//         let curtaskchain = new TaskChain(cfg.nameid);
//         let taskd = new TaskDeamon();
//
//         let lst = cfg.taskchain;
//         for (let ii = 0; ii < lst.length; ++ii) {
//             let curnameid = lst[ii];
//             if (taskfactory.hasTask(curnameid)) {
//                 curtaskchain.pushBack(taskfactory.newTask(curnameid, cfg[curnameid]));
//             }
//         }
//
//         curtaskchain.setFunc(undefined, () => {
//             if (funcOnEnd != undefined) {
//                 funcOnEnd();
//             }
//         }, undefined, undefined, undefined, undefined, undefined);
//
//         // curtaskchain.start();
//
//         if (cfg.tasktype == 'dayclock') {
//             taskd.addTask_DayClock(curtaskchain, cfg.clock);
//         }
//         else if (cfg.tasktype == 'dayclocktimer') {
//             taskd.addTask_DayClockTimer(curtaskchain, cfg.startclock, cfg.timer, cfg.endclock);
//         }
//
//         let tick = 1000;
//         if (cfg.hasOwnProperty('tick')) {
//             tick = cfg.tick;
//         }
//
//         taskd.start(tick);
//     }
//     else {
//         if (funcOnEnd != undefined) {
//             funcOnEnd();
//         }
//     }
// }

function startTaskDeamon(cfg, taskfactory) {
    if (cfg.hasOwnProperty('name') && cfg.hasOwnProperty('lsttask') && cfg.hasOwnProperty('tick')) {
        let taskd = new TaskDeamon();

        let lst = cfg.lsttask;
        for (let ii = 0; ii < lst.length; ++ii) {
            let curobj = lst[ii];
            if (curobj.hasOwnProperty('tasknameid') && curobj.hasOwnProperty('tasktype')) {
                let curnameid = curobj.tasknameid;
                if (taskfactory.hasTask(curnameid)) {
                    let curtask = taskfactory.newTask(curnameid, curobj[curnameid]);

                    if (curobj.tasktype == 'dayclock') {
                        taskd.addTask_DayClock(curtask, curobj.clock);
                    }
                    else if (curobj.tasktype == 'dayclocktimer') {
                        taskd.addTask_DayClockTimer(curtask, curobj.startclock, curobj.timer, curobj.endclock);
                    }
                }
            }
        }

        let tick = 1000;
        if (cfg.hasOwnProperty('tick')) {
            tick = cfg.tick;
        }

        taskd.start(tick);
    }
}

function startTask(cfg, taskfactory, funcOnEnd) {
    if (cfg.hasOwnProperty('name') && cfg.hasOwnProperty('tasknameid')) {
        if (taskfactory.hasTask(cfg.tasknameid)) {
            let curtask = taskfactory.newTask(cfg.tasknameid, cfg[cfg.tasknameid]);

            curtask.setFunc(undefined, () => {
                if (funcOnEnd != undefined) {
                    funcOnEnd();
                }
            }, undefined, undefined, undefined, undefined, undefined);

            curtask.start();
        }
    }
    else {
        if (funcOnEnd != undefined) {
            funcOnEnd();
        }
    }
}

// exports.startTaskChain = startTaskChain;
exports.startTaskDeamon = startTaskDeamon;
exports.startTask = startTask;