import AbstractFeature from "../../Global/Base/AbstractFeature";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import CommandServiceFactory from "./Factories/CommandServiceFactory";

class CommandFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {
        "CommandService": CommandServiceFactory
    };
    protected _moduleFactories: IFactories;
}

export default CommandFeature;
