import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import LocalizationService from "../Services/LocalizationService";

class LocalizationServiceFactory extends AbstractFactory
{
    create(): AbstractService
    {
        return new LocalizationService();
    }

}

export default LocalizationServiceFactory;
