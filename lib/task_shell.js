"use strict";

const async = require('async');
const fs = require('fs');
const vm = require('vm');
const shell = require('shelljs');
const { Task } = require('./task');
const { logger } = require('./utils');
const { JARVISTASK_NAMEID_SHELL } = require('./taskdef');

// vm的沙箱是传址
// exit就退出当前主进程了

function _logger(level, msg) {
    logger(level, msg);
}

// function _exit(code) {
//     console.log('exit ' + code);
//     shell.exit(code);
// }

class Task_Shell extends Task {
    constructor(taskfactory, cfg) {
        super(taskfactory, JARVISTASK_NAMEID_SHELL, cfg);
    }

    onStart() {
        super.onStart();

        if (this.cfg.hasOwnProperty('filename')) {
            let str = fs.readFileSync(this.cfg.filename).toString();

            const sandbox = {
                shell: shell,
                logger: _logger
            };

            vm.createContext(sandbox);
            vm.runInContext(str, sandbox);

            this.onEnd();
        }
    }
};

function regTaskFactory_Shell(taskfactory) {
    taskfactory.regTask(JARVISTASK_NAMEID_SHELL, (factory, cfg) => {
        return new Task_Shell(factory, cfg);
    });
}

exports.Task_Shell = Task_Shell;
exports.regTaskFactory_Shell = regTaskFactory_Shell;