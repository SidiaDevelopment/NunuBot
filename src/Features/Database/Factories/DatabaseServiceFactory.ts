import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import DatabaseService from "../Services/DatabaseService";

class DatabaseServiceFactory extends AbstractFactory
{
    create(): AbstractService
    {
        return new DatabaseService();
    }
}

export default DatabaseServiceFactory;
