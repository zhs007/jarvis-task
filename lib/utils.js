"use strict";

const crypto = require('crypto');
var winston = require('winston');
// require('winston-daily-rotate-file');

// default logger is only console
var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});

function log(level, msg) {
    logger.log(level, msg);
}

function generateUUID(len) {
    let struuid = '';
    const UUIDSTR = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let ii = 0; ii < len; ++ii) {
        struuid += UUIDSTR.charAt(Math.random() * UUIDSTR.length);
    }

    return struuid;
}

function checkCharNumber(c) {
    return c >= '0' && c <= '9';
}

function checkClockFormat(clock) {
    if (clock.length == 8) {
        if (checkCharNumber(clock.charAt(0)) && checkCharNumber(clock.charAt(1)) && clock.charAt(2) == ':' &&
            checkCharNumber(clock.charAt(3)) && checkCharNumber(clock.charAt(4)) && clock.charAt(5) == ':' &&
            checkCharNumber(clock.charAt(6)) && checkCharNumber(clock.charAt(7))) {
            return true;
        }
    }

    return false;
}

function hash_md5(str) {
    let md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
}

function initDailyRotateFileLog(path, level = 'level') {
    // let transport = new (winston.transports.DailyRotateFile)({
    //     filename: path,
    //     datePattern: 'yyyy-MM-dd.',
    //     prepend: true,
    //     level: level
    // });

    logger = winston.createLogger({
        level: level,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path })
        ]
    });
}

// obj is like logger.log(level, msg)
function setLogger(obj) {
    logger = obj;
}

function formatTimeMs(tms) {
    let ts = Math.floor(tms / 1000);
    if (ts < 60) {
        return ts + 's';
    }

    let ls = ts % 60;
    let tm = Math.floor(ts / 60);
    if (tm < 60) {
        return tm + 'm' + ls + 's';
    }

    let lm = tm % 60;
    let th = Math.floor(tm / 60);

    if (th < 24) {
        return th + 'h' + lm + 'm' + ls + 's';
    }

    let lh = th % 24;
    let td = Math.floor(th / 24);

    return td + 'd' + lh + 'h' + lm + 'm' + ls + 's';
}

function formatPer(per) {
    if (per < 0) {
        return '0';
    }

    if (per >= 100) {
        return '100';
    }

    return per.toFixed(3);
}

exports.generateUUID = generateUUID;
exports.checkClockFormat = checkClockFormat;
exports.hash_md5 = hash_md5;
exports.log = log;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.setLogger = setLogger;
exports.formatTimeMs = formatTimeMs;
exports.formatPer = formatPer;