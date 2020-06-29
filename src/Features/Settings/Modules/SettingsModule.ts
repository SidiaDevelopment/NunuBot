import AbstractModule from "../../../Global/Base/AbstractModule";
import {ICommand} from "../../Command/Services/CommandService";
import Discord from "discord.js";
import SettingsService from "../Services/SettingsService";
import DatabaseService from "../../Database/Services/DatabaseService";

enum SetParameters {
    Name,
    Value,
}

class SettingsModule extends AbstractModule
{
    public name = "SettingsModule";

    private readonly _databaseService: DatabaseService;
    private readonly _settingsService: SettingsService;

    constructor(databaseService: DatabaseService, settingsService: SettingsService)
    {
        super();
        this._databaseService = databaseService;
        this._settingsService = settingsService;
    }

    protected _commands: ICommand[] = [
        {
            command: "set",
            callback: (message: Discord.Message, ...args: string[]): Promise<void> => this.OnSet(message, ...args),
            permissions: {
                allowByDefault: false,
                grantFor: ["ADMINISTRATOR", "MANAGE_GUILD"]
            }
        },
        {
            command: "reset",
            callback: (message: Discord.Message, ...args: string[]): Promise<void> => this.OnReset(message, ...args),
            permissions: {
                allowByDefault: false,
                grantFor: ["ADMINISTRATOR", "MANAGE_GUILD"]
            }
        },
        {
            command: "get",
            callback: (message: Discord.Message, ...args: string[]): Promise<void> => this.OnGet(message, ...args),
            permissions: {
                allowByDefault: false,
                grantFor: ["ADMINISTRATOR", "MANAGE_GUILD"]
            }
        }
    ];

    public async OnSet(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const name = args[SetParameters.Name];
        const value = args[SetParameters.Value];

        await this._settingsService.UpdateSetting(message, name, value);
    }

    public async OnReset(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const name = args[SetParameters.Name];
        await this._settingsService.ResetSetting(message, name);
    }

    public async OnGet(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const name = args[SetParameters.Name];
        await this._settingsService.PrintSetting(message, name);
    }
}

export default SettingsModule;
