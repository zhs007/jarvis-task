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
    addTask_DayClock(task, clock) {
        if (!checkClockFormat(clock)) {
            return undefined;
        }

        let ca = clock.split(':');

        let obj = {
            tasktype: 'dayclock',
            clock: parseInt(ca[0] + ca[1] + ca[2]),
            task: task,
            lasttimems: -1
        };

        this.lstTaskObj.push(obj);
    }

    // startclock, endclock is like '15:30:00'
    // timer is ms
    // samples startclock is '09:07:00' and timer is 5 min
    // will start on '09:07:00', '09:12:00' ...
    // if first on 09:10:00, this task will start on 09:10:00, 09:12:00 ...
    addTask_DayClockTimer(task, startclock, timer, endclock) {
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
            task: task,
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
        if (curobj.lasttimems > 0) {
            let ymd = moment(curobj.lasttimems, 'x').format('YYYYMMDD');
            let curymd = moment(curms, 'x').format('YYYYMMDD');

            if (ymd != curymd) {
                curobj.lasttimems = -1;
            }
        }

        let isrun = false;
        let curt = parseInt(moment(curms, 'x').format('HHmmss'));
        if (curobj.lasttimems <= 0 && curt >= curobj.clock) {
            isrun = true;
        }
        else if (curobj.lasttimems > 0) {
            let lastt = parseInt(moment(curobj.lasttimems, 'x').format('HHmmss'));
            if (curobj.clock > lastt && curt >= curobj.clock) {
                isrun = true;
            }
        }

        if (isrun) {
            curobj.lasttimems = curms;
            curobj.task.start();
        }
    }

    _procTick_dayclocktimer(curobj, curms) {
        if (curobj.lasttimems > 0) {
            let ymd = moment(curobj.lasttimems, 'x').format('YYYYMMDD');
            let curymd = moment(curms, 'x').format('YYYYMMDD');

            if (ymd != curymd) {
                curobj.lasttimems = -1;
            }
        }

        if (curobj.lasttimems <= 0) {
            let curmt = moment(curms, 'x');
            let ymd = curmt.format('YYYYMMDD');
            let st = curobj.startclock.toString();
            if (st.length < 6) {
                st = '0' + st;
            }
            let begin = moment(ymd + ' ' + st, 'YYYYMMDD HHmmss');
            let off = curms - begin.format('x');
            let n = Math.floor(off / curobj.timer);
            curobj.lasttimems = parseInt(begin.add(n * curobj.timer, 'ms').format('x'));

            let curt = parseInt(moment(curms, 'x').format('HHmmss'));
            if (curt >= curobj.startclock && curt <= curobj.endclock) {
                curobj.task.start();
            }
        }
        else {
            let curt = parseInt(moment(curms, 'x').format('HHmmss'));
            if (curms > curobj.lasttimems + curobj.timer && curt >= curobj.startclock && curt <= curobj.endclock) {

                while (curobj.lasttimems + curobj.timer < curms) {
                    curobj.lasttimems += curobj.timer;
                }

                curobj.task.start();
            }
        }
    }
};

exports.TaskDeamon = TaskDeamon;