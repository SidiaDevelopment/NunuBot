import AbstractFeature from "../../Global/Base/AbstractFeature";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import DatabaseServiceFactory from "./Factories/DatabaseServiceFactory";

class DatabaseFeature extends AbstractFeature
{
    protected _moduleFactories: IFactories;
    protected _serviceFactories: IFactories = {
        "DatabaseService": DatabaseServiceFactory
    };
}

export default DatabaseFeature;
