import AbstractFeature, {IFactories, IPermissions} from "../../Global/Base/AbstractFeature";
import DiscordApiFactory from "./Factories/DiscordApiFactory";
import DiscordEventApiFactory from "./Factories/DiscordEventApiFactory";

class DiscordApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "DiscordApi": DiscordApiFactory,
        "DiscordEventApi": DiscordEventApiFactory,
    };

    protected _moduleFactories: IFactories;
    protected _permissions: IPermissions;
}

export default DiscordApiFeature;
