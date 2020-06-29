import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import DiscordApiService from "../Services/DiscordApiService";
import * as Discord from "discord.js";
import SettingsService from "../../Settings/Services/SettingsService";
import ServiceContainer from "../../../Container/ServiceContainer";

class DiscordApiServiceFactory extends AbstractFactory
{
    create(): AbstractService
    {
        const discordClient = new Discord.Client();
        const settingsService = ServiceContainer.Get<SettingsService>(SettingsService.name);
        return new DiscordApiService(discordClient, settingsService);
    }

}

export default DiscordApiServiceFactory;
