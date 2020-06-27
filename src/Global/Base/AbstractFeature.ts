import ServiceContainer from "../../Container/ServiceContainer";
import FeatureInterface from "../Interfaces/FeatureInterface";
import {IFactories} from "../Interfaces/FactoryInterfaces";
import ModuleContainer from "../../Container/ModuleContainer";

abstract class AbstractFeature implements FeatureInterface
{
    protected abstract _serviceFactories: IFactories;
    protected abstract _moduleFactories: IFactories;

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
