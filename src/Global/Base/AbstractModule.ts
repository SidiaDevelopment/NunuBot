import ModuleInterface from "../Interfaces/ModuleInterface";
import CommandService, {ICommand} from "../../Features/Command/Services/CommandService";
import ServiceContainer from "../../Container/ServiceContainer";
import DefaultPermissionContainer from "../../Container/DefaultPermissionContainer";

abstract class AbstractModule implements ModuleInterface
{
    public abstract name: string;

    protected _commands: ICommand[] = [];

    public Load(): void {
        if (!this._commands) return;

        const commandService = ServiceContainer.Get<CommandService>(CommandService.name);
        this._commands.forEach(v => {
            commandService.RegisterCommand(v);
            if (v.permissions) {
                DefaultPermissionContainer.Add(`Command.ChatCommand.${v.command}`, v.permissions)
            }
        })
    }
    public Unload(): void {
        if (!this._commands) return;

        const commandService = ServiceContainer.Get<CommandService>(CommandService.name);
        this._commands.forEach(v => {
            commandService.UnregisterCommand(v);
        })
    }
}

export default AbstractModule;
