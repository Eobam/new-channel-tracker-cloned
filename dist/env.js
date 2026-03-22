"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    WORKSPACE_BOT_TOKEN: zod_1.z.string(),
    SIGNING_SECRET: zod_1.z.string(),
    ALERT_USER_ID: zod_1.z.string(),
});
exports.default = envSchema.parse(process.env);
