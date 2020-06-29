import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import PermissionServiceFactory from "./Factories/PermissionServiceFactory";

class PermissionFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories;
    protected _serviceFactories: IFactories = {
        "PermissionService": PermissionServiceFactory
    };
}

export default PermissionFeature;
