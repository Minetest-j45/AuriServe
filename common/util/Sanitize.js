"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitize(str) {
    if (typeof str != "string" || str.length < 1)
        throw "Name must not be empty.";
    const sanitized = str.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    if (sanitized.length == 0)
        throw "Name must include at least one alphanumeric character.";
    return sanitized;
}
exports.default = sanitize;
