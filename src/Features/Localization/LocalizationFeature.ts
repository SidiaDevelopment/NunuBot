import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import {ISettings} from "../Settings/Services/SettingsService";
import LocalizationServiceFactory from "./Factories/LocalizationServiceFactory";

class LocalizationFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {
        "LocalizationService": LocalizationServiceFactory
    };
    protected _moduleFactories: IFactories = {};

    protected _settings: ISettings = {
        "Localization.Language": {
            value: "en"
        }
    }
}

export default LocalizationFeature;
