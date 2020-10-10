import AbstractService from "../../../Global/Base/AbstractService";
import DiscordEventApiService from "../../DiscordApi/Services/DiscordEventApiService";
import * as Discord from "discord.js";
import * as CommandParser from "discord-command-parser";
import SettingsService from "../../Settings/Services/SettingsService";
import PermissionService, {IPermission} from "../../Permission/Services/PermissionService";

type CommandCallback = (message: Discord.Message, ...params: string[]) => void;

export interface ICommand {
    command: string;
    callback: CommandCallback;
    permissions?: IPermission
}

class CommandService extends AbstractService
{
    private _discordEventApi: DiscordEventApiService;
    private _settingsService: SettingsService;
    private _permissionService: PermissionService;

    public name = "CommandService";

    private _commands: ICommand[] = [];

    constructor(discordEventApi: DiscordEventApiService, settingsService: SettingsService, permissionService: PermissionService)
    {
        super();
        this._discordEventApi = discordEventApi;
        this._settingsService = settingsService;
        this._permissionService = permissionService;
    }

    StartUp(): void
    {
        super.StartUp();
        this._discordEventApi.OnMessage(this.OnMessage);
    }

    public RegisterCommand(command: ICommand): void {
        this._commands.push(command)
    }

    public UnregisterCommand(command: ICommand): void {
        const index = this._commands.indexOf(command);
        if (index !== -1)
            this._commands.splice(index, 1);
    }

    public OnMessage = async (message: Discord.Message): Promise<void> => {
        const prefix = await this._settingsService.Get(message.guild, "Command.Sign");
        const parsed = CommandParser.parse(message, prefix);
        if (!parsed.success) return;

        this._commands.forEach(v => {
            if (v.command == parsed.command) {
                const hasPermission = this._permissionService.HasPermission(message.guild, `Command.ChatCommand.${parsed.command}`, message.member);
                if (hasPermission)
                {
                    v.callback(message, ...parsed.arguments);
                } else {
                    message.reply("You don't have permission to execute this command");
                }
            }
        })
    }
}

export default CommandService;
