import AbstractService from "../../../Global/Base/AbstractService";
import * as Discord from "discord.js";
import DatabaseService from "../../Database/Services/DatabaseService";
import SettingsModel, {ISerializedSetting} from "../Models/SettingsModel";
import NunuBot, {Phase} from "../../../NunuBot";
import DefaultSettingsContainer from "../../../Container/DefaultSettingsContainer";
import MessageFormatter from "../../DiscordApi/Helper/MessageFormatter";

export interface ISetting
{
    value: string;
    onlyGlobal?: boolean;
    defaultStrategy?: () => string;
    printable?: boolean;
}

export interface ISettings
{
    [key: string]: ISetting;
}

class SettingsService extends AbstractService
{
    public name = "PermissionService";

    private _databaseService: DatabaseService;

    constructor(databaseService: DatabaseService)
    {
        super();
        this._databaseService = databaseService;
    }

    public async Get(guild: Discord.Guild, name: string): Promise<string>
    {
        let value = null;
        if (NunuBot.Phase != Phase.Startup)
        {
            value = await SettingsModel.Get(guild.id, name);
        }

        return this.EvaluateValue(value, name);
    }

    public async GetGlobal(name: string): Promise<string>
    {
        let value = null;
        if (NunuBot.Phase != Phase.Startup)
        {
            value = await SettingsModel.Get("0", name);
        }

        return this.EvaluateValue(value, name);
    }

    protected EvaluateValue(value: ISerializedSetting[], name: string): string
    {
        if (value == null || value.length <= 0)
        {
            const defaultValues = DefaultSettingsContainer.Values();

            if (name in defaultValues)
            {
                const setting = defaultValues[name];
                if (setting.defaultStrategy)
                {
                    return defaultValues[name].defaultStrategy();
                }
                return defaultValues[name].value;
            }

            return null;
        }

        return value[0].value;
    }

    public async UpdateSetting(message: Discord.Message, name: string, value: string): Promise<boolean>
    {
        const defaultValues = DefaultSettingsContainer.Values();

        if (name in defaultValues)
        {
            if (defaultValues[name].onlyGlobal)
            {
                await message.channel.send(MessageFormatter.EmbedMessage(":x: Update failed: This setting cannot be changed per server", false));
                return false;
            }
            await SettingsModel.Update(message.guild.id, name, value);
            return true;
        }

        await message.channel.send(MessageFormatter.EmbedMessage(":x: Update failed: This setting does not exist", false));
        return false;
    }

    public async ResetSetting(message: Discord.Message, name: string): Promise<void>
    {
        const defaultValues = DefaultSettingsContainer.Values();
        if (!(name in defaultValues))
        {
            await message.channel.send(MessageFormatter.EmbedMessage(":x: Update failed: This setting does not exist", false));
        }
        await SettingsModel.Delete(message.guild.id, name);
        await message.channel.send(MessageFormatter.EmbedMessage(":white_check_mark: Successfully reset"));
    }
}

export default SettingsService;
