"use strict";

class TaskStatistics {
    constructor() {
        this.starttimems = new Date().getTime();
        this.per = 0;
        this.lasttimems = -1;
    }

    // [0.0, 100.0]
    onPer(per) {
        if (per < 0) {
            per = 0;
        }

        if (per > 100) {
            per = 100;
        }

        if (per == 0) {
            this.starttimems = new Date().getTime();
            this.lasttimems = -1;
            this.per = per;

            return ;
        }

        if (per == 100) {
            this.lasttimems = 0;
            this.per = per;

            return ;
        }

        let curtimems = new Date().getTime();
        this.lasttimems = Math.floor((curtimems - this.starttimems) / per * (100 - per));
        this.per = per;
    }
};

exports.TaskStatistics = TaskStatistics;