import AbstractFeature, {IFactories} from "../../Global/Base/AbstractFeature";
import RiotApiFactory from "./Factories/RiotApiFactory";

class RiotApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "RiotApi": RiotApiFactory,
    };
    protected _moduleFactories: IFactories;
}

export default RiotApiFeature;
