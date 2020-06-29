import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import HeartbeatModuleFactory from "./Factories/HeartbeatModuleFactory";
import {ISettings} from "../Settings/Services/SettingsService";

class HeartbeatFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {};
    protected _moduleFactories: IFactories = {
        "HeartbeatModule": HeartbeatModuleFactory
    };

    protected _settings: ISettings = {
        "Heartbeat.PingMessage": {
            value: "Pong",
        }
    }
}

export default HeartbeatFeature;
