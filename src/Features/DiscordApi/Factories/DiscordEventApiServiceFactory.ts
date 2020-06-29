import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import DiscordApiService from "../Services/DiscordApiService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DiscordEventApiService from "../Services/DiscordEventApiService";

class DiscordEventApiServiceFactory extends AbstractFactory
{
    create(): AbstractService
    {
        const discordClient = ServiceContainer.Get<DiscordApiService>(DiscordApiService.name).GetClient();
        return new DiscordEventApiService(discordClient);
    }

}

export default DiscordEventApiServiceFactory;
