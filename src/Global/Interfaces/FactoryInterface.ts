import AbstractService from "../Base/AbstractService";
import AbstractModule from "../Base/AbstractModule";

interface FactoryInterface
{
    create(): AbstractService | AbstractModule
}

export default FactoryInterface;
