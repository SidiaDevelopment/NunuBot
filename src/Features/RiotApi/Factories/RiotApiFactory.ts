import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import RiotApi from "../Services/RiotApi";

class RiotApiFactory extends AbstractFactory
{
    create(): AbstractService
    {
        return new RiotApi();
    }

}

export default RiotApiFactory;
