"use strict";

const crypto = require('crypto');
var winston = require('winston');
require('winston-daily-rotate-file');

// default logger is only console
var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console()
    ]
});

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
    let transport = new (winston.transports.DailyRotateFile)({
        filename: path,
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: level
    });

    logger = new (winston.Logger)({
        transports: [
            transport
        ]
    });
}

// obj is like function (level, info)
function setLogger(obj) {
    logger = obj;
}

exports.generateUUID = generateUUID;
exports.checkClockFormat = checkClockFormat;
exports.hash_md5 = hash_md5;
exports.logger = logger;
exports.initDailyRotateFileLog = initDailyRotateFileLog;
exports.setLogger = setLogger;