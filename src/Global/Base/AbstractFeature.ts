import ServiceContainer from "../../Container/ServiceContainer";
import FeatureInterface from "../Interfaces/FeatureInterface";
import ModuleContainer from "../../Container/ModuleContainer";
import AbstractFactory from "../Base/AbstractFactory";

export type IFactory = new () => AbstractFactory;
export interface IFactories
{
    [id: string]: IFactory;
}

export type IPermissions = Array<string>;

abstract class AbstractFeature implements FeatureInterface
{
    protected abstract _serviceFactories: IFactories;
    protected abstract _moduleFactories: IFactories;
    protected abstract _permissions: IPermissions;

    public AddServiceFactories(): void
    {
        if (!this._serviceFactories) return;

        const serviceContainer = ServiceContainer;

        Object.keys(this._serviceFactories).forEach(v =>
        {
            const name = v;
            const factory = this._serviceFactories[name];

            serviceContainer.AddFactory(name, factory);
        })
    }

    public AddModuleFactories(): void
    {
        if (!this._moduleFactories) return;

        const moduleContainer = ModuleContainer;

        Object.keys(this._moduleFactories).forEach(v =>
        {
            const name = v;
            const factory = this._moduleFactories[name];

            moduleContainer.AddFactory(name, factory);
        })
    }

    public StartUpServices(): void
    {
        const serviceContainer = ServiceContainer;

        Object.keys(this._serviceFactories).forEach(v =>
        {
            const name = v;
            const service = serviceContainer.Get(name);
            service.StartUp();
        })
    }

    public StartUpModules(): void
    {
        return;
    }
}

export default AbstractFeature;
