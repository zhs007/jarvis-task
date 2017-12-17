"use strict";

const async = require('async');
const fs = require('fs');
const vm = require('vm');
const shell = require('shelljs');
const { Task } = require('../index');
const { JARVISTASK_NAMEID_SHELL } = require('./taskdef');

class Task_Shell extends Task {
    constructor(cfg) {
        super(JARVISTASK_NAMEID_SHELL, cfg);
    }

    onStart() {
        super.onStart();

        if (this.cfg.hasOwnProperty('filename')) {
            let str = fs.readFileSync(this.cfg.filename).toString();
            const sandbox = { shell: shell };
            vm.createContext(sandbox);
            vm.runInContext(str, sandbox);

            this.onEnd();
        }
    }
};

function regTaskFactory_Shell(taskfactory) {
    taskfactory.regTask(JARVISTASK_NAMEID_SHELL, (cfg) => {
        return new Task_Shell(cfg);
    });
}

exports.Task_Shell = Task_Shell;
exports.regTaskFactory_Shell = regTaskFactory_Shell;