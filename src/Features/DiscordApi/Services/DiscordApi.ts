import * as Discord from "discord.js";
import AbstractService from "../../../Global/Base/AbstractService";
import Logger, {LogLevel} from "../../Logging/Helper/Logger";
import * as Config from "../../../Config/config.json"

class DiscordApi extends AbstractService
{
    public name = "DiscordApi";

    private readonly _client: Discord.Client;

    constructor(client: Discord.Client)
    {
        super();
        this._client = client;
    }

    StartUp(): void
    {
        super.StartUp();
        this.Login().then(() =>
        {
            Logger.log(LogLevel.Debug, "DiscordApi logged in");
        });
    }

    public async Login(): Promise<void>
    {
        await this._client.login(Config.discordApiKey);
    }

    public GetClient(): Discord.Client {
        return this._client;
    }
}

export default DiscordApi;
