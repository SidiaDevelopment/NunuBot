import AbstractFactory from "../../../Global/Base/AbstractFactory";
import SettingsService from "../Services/SettingsService";
import AbstractService from "../../../Global/Base/AbstractService";
import ServiceContainer from "../../../Container/ServiceContainer";
import DatabaseService from "../../Database/Services/DatabaseService";

class SettingsServiceFactory extends AbstractFactory
{
    public create(): AbstractService
    {
        const databaseService = ServiceContainer.Get<DatabaseService>(DatabaseService.name);
        return new SettingsService(databaseService);
    }
}

export default SettingsServiceFactory;
