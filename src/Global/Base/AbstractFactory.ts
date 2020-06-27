import AbstractService from "./AbstractService";
import FactoryInterface from "../Interfaces/FactoryInterface";
import AbstractModule from "./AbstractModule";

abstract class AbstractFactory implements FactoryInterface
{
    public abstract create(): AbstractService | AbstractModule
}

export default AbstractFactory;
