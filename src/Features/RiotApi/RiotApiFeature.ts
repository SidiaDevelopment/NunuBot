import AbstractFeature from "../../Global/Base/AbstractFeature";
import {IFactories} from "../../Global/Interfaces/FactoryInterfaces";
import RiotApiFactory from "./Factories/RiotApiFactory";

class RiotApiFeature extends AbstractFeature
{
    protected _serviceFactories: IFactories =
    {
        "RiotApi": RiotApiFactory,
    };
    protected _moduleFactories: IFactories;

    StartUpServices(): void
    {
        return;
    }

}

export default RiotApiFeature;
