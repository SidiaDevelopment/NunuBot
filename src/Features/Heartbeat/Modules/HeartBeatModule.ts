import AbstractModule from "../../../Global/Base/AbstractModule";
import * as Discord from "discord.js";

class HeartbeatModule extends AbstractModule
{
    public name = "HeartbeatModule";

    protected _commands = [
        {
            command: "ping",
            callback: HeartbeatModule.OnPing
        }
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private static OnPing(message: Discord.Message, ...args: string[]): void
    {
        message.reply("Pong")
    }
}

export default HeartbeatModule;
