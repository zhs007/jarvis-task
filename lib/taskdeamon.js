"use strict";

const moment = require('moment');
const { checkClockFormat } = require('./utils');

class TaskDeamon {
    constructor() {
        this.lstTaskObj = [];

        this.tickid = undefined;
        this.tickms = 1000;
    }

    // clock is like '15:30:00'
    addTaskChain_DayClock(taskchain, clock) {
        if (!checkClockFormat(clock)) {
            return undefined;
        }

        let ca = clock.split(':');

        let obj = {
            tasktype: 'dayclock',
            clock: parseInt(ca[0] + ca[1] + ca[2]),
            taskchain: taskchain,
            lasttimems: -1
        };

        this.lstTaskObj.push(obj);
    }

    start(tickms) {
        if (this.tickid != undefined) {
            clearInterval(this.tickid);

            this.tickid = undefined;
        }

        this.tickms = tickms;

        this.tickid = setInterval(() => {
            this.onTick();
        }, this.tickms);
    }

    onTick() {
        let curms = parseInt(moment().format('x'));

        for (let ii = 0; ii < this.lstTaskObj.length; ++ii) {
            let curobj = this.lstTaskObj[ii];
            if (curobj.tasktype == 'dayclock') {
                this._procTick_dayclock(curobj, curms);
            }
        }
    }

    _procTick_dayclock(curobj, curms) {
        let curt = parseInt(moment(curms, 'x').format('HHmmss'));
        if (curms > curobj.lasttimems && curt >= curobj.clock) {
            curobj.lasttimems = curms;
            curobj.taskchain.start();
        }
    }
};

exports.TaskDeamon = TaskDeamon;