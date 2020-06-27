import AbstractFactory from "../../../Global/Base/AbstractFactory";
import HeartbeatModule from "../Modules/HeartBeatModule";
import AbstractModule from "../../../Global/Base/AbstractModule";

class HeartbeatModuleFactory extends AbstractFactory
{
    public create(): AbstractModule
    {
        return new HeartbeatModule();
    }
}

export default HeartbeatModuleFactory;
