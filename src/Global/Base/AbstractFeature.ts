import ServiceContainer from "../../Container/ServiceContainer";
import FeatureInterface from "../Interfaces/FeatureInterface";
import ModuleContainer from "../../Container/ModuleContainer";
import AbstractFactory from "../Base/AbstractFactory";
import {ISettings} from "../../Features/Settings/Services/SettingsService";
import DefaultSettingsContainer from "../../Container/DefaultSettingsContainer";
import DefaultPermissionContainer from "../../Container/DefaultPermissionContainer";
import {IDefaultPermissions} from "../../Features/Permission/Services/PermissionService";
import {ILocalizationFiles} from "../../Features/Localization/Services/LocalizationService";
import LocalizationContainer from "../../Container/LocalizationContainer";

export type IFactory = new () => AbstractFactory;
export interface IFactories
{
    [id: string]: IFactory;
}

abstract class AbstractFeature implements FeatureInterface
{
    protected _serviceFactories: IFactories;
    protected _moduleFactories: IFactories;
    protected _permissions: IDefaultPermissions;
    protected _settings: ISettings;
    protected _localization: ILocalizationFiles;

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
            const service = serviceContainer.Get(v);
            service.StartUp();
        })
    }

    public LoadSettings(): void {
        DefaultSettingsContainer.AddRange(this._settings);
        DefaultPermissionContainer.AddRange(this._permissions);
        LocalizationContainer.AddRange(this._localization);
    }
}

export default AbstractFeature;
