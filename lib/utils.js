"use strict";

function generateUUID(len) {
    let struuid = '';
    const UUIDSTR = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let ii = 0; ii < len; ++ii) {
        struuid += UUIDSTR.charAt(Math.random() * UUIDSTR.length);
    }

    return struuid;
}

exports.generateUUID = generateUUID;