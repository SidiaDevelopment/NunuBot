import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import DiscordApiServiceFactory from "./Factories/DiscordApiServiceFactory";
import DiscordEventApiServiceFactory from "./Factories/DiscordEventApiServiceFactory";
import {ISettings} from "../Settings/Services/SettingsService";
import * as Config from "../../Config/config.json";
import {IDefaultPermissions} from "../Permission/Services/PermissionService";

class DiscordApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "DiscordApiService": DiscordApiServiceFactory,
        "DiscordEventApiService": DiscordEventApiServiceFactory,
    };

    protected _moduleFactories: IFactories;
    protected _settings: ISettings = {
        "DiscordApi.ApiKey": {
            value: "",
            onlyGlobal: true,
            defaultStrategy: (): string => Config.discordApiKey,
            printable: false
        }
    }
}

export default DiscordApiFeature;
