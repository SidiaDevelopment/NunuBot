import DiscordApiFeature from "./Features/DiscordApi/DiscordApiFeature";
import RiotApiFeature from "./Features/RiotApi/RiotApiFeature";
import AbstractFeature from "./Global/Base/AbstractFeature";
import CommandFeature from "./Features/Command/CommandFeature";
import HeartbeatFeature from "./Features/Heartbeat/HeartbeatFeature";
import ModuleContainer from "./Container/ModuleContainer";
import DatabaseFeature from "./Features/Database/DatabaseFeature";
import PermissionFeature from "./Features/Permission/PermissionFeature";
import SettingsFeature from "./Features/Settings/SettingsFeature";
import NunuBot, {Phase} from "./NunuBot";
import LocalizationFeature from "./Features/Localization/LocalizationFeature";

class Features
{
    private readonly _features: AbstractFeature[] = [
        new DatabaseFeature,
        new DiscordApiFeature,
        new RiotApiFeature,
        new CommandFeature,
        new HeartbeatFeature,
        new PermissionFeature,
        new SettingsFeature,
        new LocalizationFeature,
    ];


    public LoadFeatures(): void
    {
        this._features.forEach(v => {
            v.LoadSettings();
        });

        this._features.forEach(v => {
            v.AddServiceFactories();
        });

        this._features.forEach(v => {
            v.StartUpServices();
        });

        this._features.forEach(v => {
            v.AddModuleFactories();
        });

        ModuleContainer.LoadAll();

        NunuBot.Phase = Phase.Running;
    }
}

export default Features;
