import AbstractFeature from "../../Global/Base/AbstractFeature";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import HeartbeatModuleFactory from "./Factories/HeartbeatModuleFactory";

class HeartbeatFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {};
    protected _moduleFactories: IFactories = {
        "HeartbeatModule": HeartbeatModuleFactory
    };
}

export default HeartbeatFeature;
