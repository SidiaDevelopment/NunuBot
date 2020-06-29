import Discord from "discord.js";
import ServiceContainer from "../../../Container/ServiceContainer";
import SettingsService from "../../Settings/Services/SettingsService";

class PingCommand {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static async OnPing(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const configService = ServiceContainer.Get<SettingsService>(SettingsService.name);
        const answer = await configService.Get(message.guild, "Heartbeat.PingMessage");
        await message.reply(answer);
        return;
    }
}

export default PingCommand;
