import AbstractFeature from "../../Global/Base/AbstractFeature";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import PermissionServiceFactory from "./Factory/PermissionServiceFactory";

class PermissionFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories;
    protected _serviceFactories: IFactories = {
        "PermissionService": PermissionServiceFactory
    };
}

export default PermissionFeature;
