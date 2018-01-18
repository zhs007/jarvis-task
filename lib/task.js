"use strict";

const { generateUUID } = require('./utils');
const { TaskStatistics } = require('./taskstatistics');

const TASK_STATE_READY  = 0;
const TASK_STATE_RUNING = 1;
const TASK_STATE_PAUSE  = 2;
const TASK_STATE_END    = 3;
const TASK_STATE_STOP   = 4;

class Task {
    constructor(taskfactory, nameid, cfg) {
        this.nameid = nameid;
        this.uuid = generateUUID(64);
        this.tickms = 1000;
        this.tickid = undefined;

        this.taskState = TASK_STATE_READY;

        this.funcOnStart = undefined;
        this.funcOnEnd = undefined;
        this.funcOnPause = undefined;
        this.funcOnResume = undefined;
        this.funcOnStop = undefined;
        this.funcOnTick = undefined;
        this.funcOnCheck = undefined;

        this.cfg = cfg;

        this.taskStatistics = new TaskStatistics();
    }

    setFunc(funcOnStart, funcOnEnd, funcOnPause, funcOnResume, funcOnStop, funcOnTick, funcOnCheck) {
        this.funcOnStart = funcOnStart;
        this.funcOnEnd = funcOnEnd;
        this.funcOnPause = funcOnPause;
        this.funcOnResume = funcOnResume;
        this.funcOnStop = funcOnStop;
        this.funcOnTick = funcOnTick;
        this.funcOnCheck = funcOnCheck;
    }

    isRuning() {
        return this.taskState == TASK_STATE_RUNING;
    }

    isPause() {
        return this.taskState == TASK_STATE_PAUSE;
    }

    isEnd() {
        return this.taskState == TASK_STATE_END || this.taskState == TASK_STATE_STOP;
    }

    isCanStart() {
        return this.taskState == TASK_STATE_READY || this.taskState == TASK_STATE_END || this.taskState == TASK_STATE_STOP;
    }

    start() {
        if (this.isCanStart()) {
            this.taskState = TASK_STATE_RUNING;

            this.onStart();
        }
        else if (this.taskState == TASK_STATE_PAUSE) {
            this.taskState = TASK_STATE_RUNING;

            this.onResume();
        }
    }

    stop() {
        if (this.taskState == TASK_STATE_STOP) {
            this.taskState = TASK_STATE_STOP;

            this.onStop();
        }
    }

    pause() {
        if (this.taskState == TASK_STATE_RUNING) {
            this.taskState = TASK_STATE_RUNING;

            this.onPause();
        }
    }

    resume() {
        if (this.taskState == TASK_STATE_PAUSE) {
            this.taskState = TASK_STATE_RUNING;

            this.onResume();
        }
    }

    startTick(tickms) {
        if (this.tickid != undefined) {
            clearInterval(this.tickid);

            this.tickid = undefined;
        }

        this.tickms = tickms;

        this.tickid = setInterval(() => {
            this.onTick();
        }, this.tickms);
    }

    onStart() {
        if (this.funcOnStart != undefined) {
            this.funcOnStart();
        }
    }

    onEnd() {
        if (this.funcOnEnd != undefined) {
            this.funcOnEnd();
        }

        this.taskState = TASK_STATE_END;
    }

    onPause() {
        if (this.funcOnPause != undefined) {
            this.funcOnPause();
        }
    }

    onResume() {
        if (this.funcOnResume != undefined) {
            this.funcOnResume();
        }
    }

    onStop() {
        if (this.funcOnStop != undefined) {
            this.funcOnStop();
        }
    }

    onTick() {
        if (this.funcOnTick != undefined) {
            this.funcOnTick();
        }
    }

    onCheck() {
        if (this.funcOnCheck != undefined) {
            this.funcOnCheck();
        }
    }
};

exports.Task = Task;