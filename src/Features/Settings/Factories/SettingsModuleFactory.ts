import AbstractFactory from "../../../Global/Base/AbstractFactory";
import SettingsService from "../Services/SettingsService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DatabaseService from "../../Database/Services/DatabaseService";
import SettingsModule from "../Modules/SettingsModule";
import AbstractModule from "../../../Global/Base/AbstractModule";

class SettingsModuleFactory extends AbstractFactory
{
    public create(): AbstractModule
    {
        const databaseService = ServiceContainer.Get<DatabaseService>(DatabaseService.name);
        const settingsService = ServiceContainer.Get<SettingsService>(SettingsService.name);
        return new SettingsModule(databaseService, settingsService);
    }
}

export default SettingsModuleFactory;
