import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import SettingsServiceFactory from "./Factories/SettingsServiceFactory";
import SettingsModuleFactory from "./Factories/SettingsModuleFactory";

class SettingsFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories = {
        "SettingsModule": SettingsModuleFactory
    }
    protected _serviceFactories: IFactories = {
        "SettingsService": SettingsServiceFactory
    };
}

export default SettingsFeature;
