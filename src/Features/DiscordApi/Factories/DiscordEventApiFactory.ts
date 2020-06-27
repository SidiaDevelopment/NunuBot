import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import DiscordApi from "../Services/DiscordApi";
import ServiceContainer from "../../../Container/ServiceContainer";
import DiscordEventApi from "../Services/DiscordEventApi";

class DiscordEventApiFactory extends AbstractFactory
{
    create(): AbstractService
    {
        const discordClient = ServiceContainer.Get<DiscordApi>(DiscordApi.name).GetClient();
        return new DiscordEventApi(discordClient);
    }

}

export default DiscordEventApiFactory;
