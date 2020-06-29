import AbstractFeature, {IFactories, IPermissions} from "../../Global/Base/AbstractFeature";
import RiotApiFactory from "./Factories/RiotApiFactory";

class RiotApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "RiotApi": RiotApiFactory,
    };
    protected _moduleFactories: IFactories;

    protected _permissions: IPermissions;
}

export default RiotApiFeature;
