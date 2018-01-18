"use strict";

class TaskStatistics {
    constructor() {
        this.starttimems = new Date().getTime();
        this.per = 0.0;
        this.lasttimems = 0;
    }

    // [0.0, 100.0]
    onPer(per) {
        if (per < 0) {
            per = 0;
        }

        if (per > 100) {
            per = 100;
        }

        let curtimems = new Date().getTime();
        this.lasttimems = Math.floor((curtimems - this.starttimems) / per * (100 - per));
        this.per = per;
    }
};

exports.TaskStatistics = TaskStatistics;