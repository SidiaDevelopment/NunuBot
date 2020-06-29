import Logger, {LogLevel} from "../Features/Logging/Helper/Logger";
import AbstractModule from "../Global/Base/AbstractModule";
import {IFactories, IFactory} from "../Global/Interfaces/FactoryInterfaces";

interface IModuleContainer
{
    [id: string]: AbstractModule;
}

class ModuleContainer
{
    private _container: IModuleContainer = {};
    private _factories: IFactories = {};

    public AddFactory(name: string, factory: IFactory): void
    {
        if (name in this._factories)
        {
            Logger.log(LogLevel.Error, "Factory already added:", name);
            return;
        }

        Logger.log(LogLevel.Debug, "Added module factory:", name);

        this._factories[name] = factory;
    }

    public LoadAll(): void
    {
        Object.keys(this._factories).forEach(v => this.Load(v));
    }

    public Load(name: string): void
    {
        if (!(name in this._factories))
        {
            return;
        }

        if (name in this._container)
        {
            return;
        }

        const moduleName = name;
        const moduleFactory = new this._factories[moduleName];

        const moduleInstance = <AbstractModule>moduleFactory.create();
        this._container[moduleName] = moduleInstance;
        moduleInstance.Load();
        Logger.log(LogLevel.Debug, "Loading module: ", moduleName);

    }

    public UnloadAll()
    {
        Object.keys(this._container).forEach(v => this.Unload(v));
    }

    public Unload(name: string): void
    {
        if (!(name in this._container))
        {
            return;
        }

        const moduleName = name;
        const moduleInstance = this._container[moduleName];
        moduleInstance.Unload();
        delete this._container[moduleName];
    }

    public Get<T extends AbstractModule>(name: string): AbstractModule
    {
        if (!(name in this._container))
        {
            return null;
        }

        return <T>this._container[name];
    }
}

export default new ModuleContainer();
