import AbstractModule from "../../../Global/Base/AbstractModule";
import * as Discord from "discord.js";
import ServiceContainer from "../../../Container/ServiceContainer";
import PermissionService from "../../Permission/Services/PermissionService";

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
    private static async OnPing(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const perm = await ServiceContainer.Get<PermissionService>(PermissionService.name).HasPermission(message.guild, "command.ping", message.member);

        if (!perm)
        {
            message.reply("You do not have permission to do this");
            return;
        }
        message.reply("Pong");
    }
}

export default HeartbeatModule;
