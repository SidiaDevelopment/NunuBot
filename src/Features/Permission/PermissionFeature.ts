import AbstractFeature, {IFactories, IPermissions} from "../../Global/Base/AbstractFeature";
import PermissionServiceFactory from "./Factory/PermissionServiceFactory";

class PermissionFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories;
    protected _serviceFactories: IFactories = {
        "PermissionService": PermissionServiceFactory
    };
    protected _permissions: IPermissions;
}

export default PermissionFeature;
