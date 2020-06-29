import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import SettingsServiceFactory from "./Factories/SettingsServiceFactory";
import SettingsModuleFactory from "./Factories/SettingsModuleFactory";
import {ILocalizationFiles} from "../Localization/Services/LocalizationService";
import * as de from "./Localization/de.json";
import * as en from "./Localization/en.json";

class SettingsFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories = {
        "SettingsModule": SettingsModuleFactory
    }
    protected _serviceFactories: IFactories = {
        "SettingsService": SettingsServiceFactory
    };

    protected _localization: ILocalizationFiles = {
        "de": de,
        "en": en
    }
}

export default SettingsFeature;
