import AbstractService from "../../../Global/Base/AbstractService";
import DiscordEventApi from "../../DiscordApi/Services/DiscordEventApi";
import * as Discord from "discord.js";
import * as CommandParser from "discord-command-parser";

type CommandCallback = (message: Discord.Message, ...params: string[]) => void;

export interface ICommand {
    command: string;
    callback: CommandCallback;
}

class CommandService extends AbstractService
{
    private _discordEventApi: DiscordEventApi;

    public name = "CommandService";

    private _commands: ICommand[] = [];

    constructor(discordEventApi: DiscordEventApi)
    {
        super();
        this._discordEventApi = discordEventApi;
    }

    StartUp(): void
    {
        super.StartUp();
        this._discordEventApi.OnMessage(this.OnMessage);
    }

    public RegisterCommand(command: string, callback: CommandCallback): void {
        this._commands.push({
            command,
            callback,
        })
    }

    public UnregisterCommand(command: string, callback: CommandCallback): void {
        const index = this._commands.indexOf({
            command,
            callback,
        });
        if (index !== -1)
            this._commands.splice(index, 1);
    }

    public OnMessage = (message: Discord.Message): void => {
        const prefix = "$";
        const parsed = CommandParser.parse(message, prefix);
        if (!parsed.success) return;

        console.log(parsed.command);
        this._commands.forEach(v => {
            if (v.command == parsed.command) {
                v.callback(message, ...parsed.arguments);
            }
        })
    }
}

export default CommandService;
