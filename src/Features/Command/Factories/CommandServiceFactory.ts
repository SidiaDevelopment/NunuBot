import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import CommandService from "../Services/CommandService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DiscordEventApiService from "../../DiscordApi/Services/DiscordEventApiService";
import SettingsService from "../../Settings/Services/SettingsService";
import PermissionService from "../../Permission/Services/PermissionService";

class CommandServiceFactory extends AbstractFactory
{
    public create(): AbstractService
    {
        const discordEventApi = ServiceContainer.Get<DiscordEventApiService>(DiscordEventApiService.name);
        const settingsService = ServiceContainer.Get<SettingsService>(SettingsService.name);
        const permissionService = ServiceContainer.Get<PermissionService>(PermissionService.name);

        return new CommandService(discordEventApi, settingsService, permissionService);
    }
}

export default CommandServiceFactory;
