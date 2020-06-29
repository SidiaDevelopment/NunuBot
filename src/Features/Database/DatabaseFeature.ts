import AbstractFeature, {IFactories, IPermissions} from "../../Global/Base/AbstractFeature";
import DatabaseServiceFactory from "./Factories/DatabaseServiceFactory";

class DatabaseFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories;
    protected _serviceFactories: IFactories = {
        "DatabaseService": DatabaseServiceFactory
    };
    protected _permissions: IPermissions;
}

export default DatabaseFeature;
