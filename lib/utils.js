"use strict";

const crypto = require('crypto');

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
    var md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
}

exports.generateUUID = generateUUID;
exports.checkClockFormat = checkClockFormat;
exports.hash_md5 = hash_md5;