import AbstractFeature from "../../Global/Base/AbstractFeature";
import DiscordApiFactory from "./Factories/DiscordApiFactory";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import DiscordEventApiFactory from "./Factories/DiscordEventApiFactory";

class DiscordApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "DiscordApi": DiscordApiFactory,
        "DiscordEventApi": DiscordEventApiFactory,
    };

    protected _moduleFactories: IFactories;
}

export default DiscordApiFeature;
