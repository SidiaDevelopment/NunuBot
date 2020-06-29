import AbstractFactory from "../../../Global/Base/AbstractFactory";
import PermissionService from "../Services/PermissionService";
import AbstractService from "../../../Global/Base/AbstractService";

class PermissionServiceFactory extends AbstractFactory
{
    create(): AbstractService
    {
        return new PermissionService();
    }
}

export default PermissionServiceFactory;
