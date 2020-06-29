import AbstractFactory from "../../../Global/Base/AbstractFactory";
import SettingsService from "../Services/SettingsService";
import AbstractService from "../../../Global/Base/AbstractService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DatabaseService from "../../Database/Services/DatabaseService";
import LocalizationService from "../../Localization/Services/LocalizationService";

class SettingsServiceFactory extends AbstractFactory
{
    public create(): AbstractService
    {
        const databaseService = ServiceContainer.Get<DatabaseService>(DatabaseService.name);
        const localizationService = ServiceContainer.Get<LocalizationService>(LocalizationService.name);
        return new SettingsService(databaseService, localizationService);
    }
}

export default SettingsServiceFactory;
