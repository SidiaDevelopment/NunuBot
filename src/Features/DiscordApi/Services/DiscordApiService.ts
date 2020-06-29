import * as Discord from "discord.js";
import AbstractService from "../../../Global/Base/AbstractService";
import Logger, {LogLevel} from "../../Logging/Helper/Logger";
import SettingsService from "../../Settings/Services/SettingsService";

class DiscordApiService extends AbstractService
{
    public name = "DiscordApiService";

    private readonly _client: Discord.Client;
    private readonly _settingsService: SettingsService;

    constructor(client: Discord.Client, settingsService: SettingsService)
    {
        super();
        this._client = client;
        this._settingsService = settingsService;
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
        const key = await this._settingsService.GetGlobal("DiscordApi.ApiKey")
        await this._client.login(key);
    }

    public GetClient(): Discord.Client {
        return this._client;
    }
}

export default DiscordApiService;
