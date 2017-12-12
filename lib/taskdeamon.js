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

    // startclock, endclock is like '15:30:00'
    // timer is ms
    addTaskChain_DayClockTimer(taskchain, startclock, timer, endclock) {
        if (startclock == undefined) {
            startclock = '00:00:00';
        }

        if (endclock == undefined) {
            endclock = '23:59:59';
        }

        if (!checkClockFormat(startclock)) {
            return undefined;
        }

        if (!checkClockFormat(endclock)) {
            return undefined;
        }

        let startca = startclock.split(':');
        let endca = endclock.split(':');

        let obj = {
            tasktype: 'dayclocktimer',
            startclock: parseInt(startca[0] + startca[1] + startca[2]),
            endclock: parseInt(endca[0] + endca[1] + endca[2]),
            timer: timer,
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
            else if (curobj.tasktype == 'dayclocktimer') {
                this._procTick_dayclocktimer(curobj, curms);
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

    _procTick_dayclocktimer(curobj, curms) {
        let curt = parseInt(moment(curms, 'x').format('HHmmss'));
        if (curms > curobj.lasttimems + curobj.timer && curt >= curobj.startclock && curt <= curobj.endclock) {
            curobj.lasttimems = curms;
            curobj.taskchain.start();
        }
    }
};

exports.TaskDeamon = TaskDeamon;