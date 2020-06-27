import AbstractService from "../Global/Base/AbstractService";
import AbstractFactory from "../Global/Base/AbstractFactory";
import Logger, {LogLevel} from "../Helper/Logger";
import {IFactories, IFactory} from "../Global/Interfaces/FactoryInterfaces";

interface IServiceContainer
{
    [id: string]: AbstractService;
}

class ServiceContainer
{
    private _container: IServiceContainer = {};
    private _factories: IFactories = {};

    public AddFactory(name: string, factory: IFactory): void
    {
        if (name in this._factories)
        {
            Logger.log(LogLevel.Error, "Factory already added:", name);
            return;
        }

        Logger.log(LogLevel.Debug, "Added service factory:", name);

        this._factories[name] = factory;
    }

    public Get<T extends AbstractService>(serviceName: string): T | null {

        if (serviceName in this._container) {
            return <T>this._container[serviceName];
        }

        if (!(serviceName in this._factories)) {
            return null;
        }

        Logger.log(LogLevel.Debug, "Getting service:", serviceName);
        const serviceFactory: AbstractFactory = new this._factories[serviceName];
        const service = <T>serviceFactory.create();
        this._container[serviceName] = service;

        return service;
    }
}

export default new ServiceContainer();
