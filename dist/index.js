"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const env_1 = __importDefault(require("./env"));
const app = new bolt_1.App({
    token: env_1.default.WORKSPACE_BOT_TOKEN,
    signingSecret: env_1.default.SIGNING_SECRET,
});
const people = env_1.default.ALERT_USER_ID.split(",");
app.event("channel_created", async ({ event, client }) => {
    for (const person of people) {
        await client.chat.postMessage({
            channel: person,
            text: `<#${event.channel.id}> created by <@${event.channel.creator}>`,
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `<#${event.channel.id}> (${event.channel.name}) created by <@${event.channel.creator}>`,
                    },
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `<!subteam^S07MTSEBEK1>`,
                        },
                    ],
                },
            ],
        });
    }
});
app.start(3000);
app.client.chat.postMessage({
    channel: people[0],
    text: "wakey wakey",
});
