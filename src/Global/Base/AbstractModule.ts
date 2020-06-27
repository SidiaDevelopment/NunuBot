import ModuleInterface from "../Interfaces/ModuleInterface";
import CommandService, {ICommand} from "../../Features/Command/Services/CommandService";
import ServiceContainer from "../../Container/ServiceContainer";

abstract class AbstractModule implements ModuleInterface
{
    public abstract name: string;

    protected _commands: ICommand[] = [];

    public Load(): void {
        if (!this._commands) return;

        const commandService = ServiceContainer.Get<CommandService>(CommandService.name);
        this._commands.forEach(v => {
            commandService.RegisterCommand(v.command, v.callback);
        })
    }
    public Unload(): void {
        if (!this._commands) return;

        const commandService = ServiceContainer.Get<CommandService>(CommandService.name);
        this._commands.forEach(v => {
            commandService.UnregisterCommand(v.command, v.callback);
        })
    }
}

export default AbstractModule;
