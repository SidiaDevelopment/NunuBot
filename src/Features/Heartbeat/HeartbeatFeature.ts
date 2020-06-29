import AbstractFeature, {IFactories, IPermissions} from "../../Global/Base/AbstractFeature";
import HeartbeatModuleFactory from "./Factories/HeartbeatModuleFactory";

class HeartbeatFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories = {};
    protected _moduleFactories: IFactories = {
        "HeartbeatModule": HeartbeatModuleFactory
    };
    protected _permissions: IPermissions = [
        "command.ping"
    ];
}

export default HeartbeatFeature;
