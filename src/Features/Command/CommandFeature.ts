import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import CommandServiceFactory from "./Factories/CommandServiceFactory";
import {ISettings} from "../Settings/Services/SettingsService";

class CommandFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {
        "CommandService": CommandServiceFactory
    };
    protected _moduleFactories: IFactories;
    protected _settings: ISettings = {
        "Command.Sign": {
            value: "$"
        }
    }
}

export default CommandFeature;
