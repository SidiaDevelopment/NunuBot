import AbstractModule from "../../../Global/Base/AbstractModule";
import {ICommand} from "../../Command/Services/CommandService";
import Discord from "discord.js";
import SettingsService from "../Services/SettingsService";
import DatabaseService from "../../Database/Services/DatabaseService";
import MessageFormatter from "../../DiscordApi/Helper/MessageFormatter";
import SettingsModel from "../Models/SettingsModel";
import DefaultSettingsContainer from "../../../Container/DefaultSettingsContainer";

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

        const update = await this._settingsService.UpdateSetting(message, name, value);
        if (update) {
            await message.channel.send(MessageFormatter.EmbedMessage(":white_check_mark: Successfully updated"));
            SettingsModel.FlushValue(message.guild.id, name);
        }

        return;
    }

    public async OnReset(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const name = args[SetParameters.Name];
        await this._settingsService.ResetSetting(message, name);
    }

    public async OnGet(message: Discord.Message, ...args: string[]): Promise<void>
    {
        const name = args[SetParameters.Name];
        const defaultValues = DefaultSettingsContainer.Values();

        if (name in defaultValues) {
            const element = defaultValues[name];
            if (element.printable === false) {
                await message.channel.send(MessageFormatter.EmbedMessage(":x: Could not find setting", false));
                return;
            }
        }

        const value = await this._settingsService.Get(message.guild, name);

        if (value != null) {
            await message.channel.send(MessageFormatter.EmbedMessage(value));
            return;
        }

        await message.channel.send(MessageFormatter.EmbedMessage(":x: Could not find setting", false));
    }
}

export default SettingsModule;
