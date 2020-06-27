import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import CommandService from "../Services/CommandService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DiscordEventApi from "../../DiscordApi/Services/DiscordEventApi";

class CommandServiceFactory extends AbstractFactory
{
    public create(): AbstractService
    {
        const discordEventApi = ServiceContainer.Get<DiscordEventApi>(DiscordEventApi.name);
        return new CommandService(discordEventApi);
    }
}

export default CommandServiceFactory;
