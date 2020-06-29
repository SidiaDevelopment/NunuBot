import AbstractService from "../../../Global/Base/AbstractService";
import * as Discord from "discord.js";
import DatabaseService from "../../Database/Services/DatabaseService";
import SettingsModel, {ISerializedSetting} from "../Models/SettingsModel";
import NunuBot, {Phase} from "../../../NunuBot";
import DefaultSettingsContainer from "../../../Container/DefaultSettingsContainer";
import MessageFormatter from "../../DiscordApi/Helper/MessageFormatter";
import LocalizationService from "../../Localization/Services/LocalizationService";

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

    private readonly _databaseService: DatabaseService;
    private readonly _localizationService: LocalizationService;

    constructor(databaseService: DatabaseService, localizationService: LocalizationService)
    {
        super();
        this._databaseService = databaseService;
        this._localizationService = localizationService;
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
                const text = await this._localizationService.Translate(message.guild, "settings.onlyGlobal");
                await message.channel.send(MessageFormatter.FailMessage(text));
                return false;
            }

            await SettingsModel.Update(message.guild.id, name, value);
            const text = await this._localizationService.Translate(message.guild, "settings.success", {name});
            SettingsModel.FlushValue(message.guild.id, name);
            await message.channel.send(MessageFormatter.SuccessMessage(text));
            return true;
        }

        const text = await this._localizationService.Translate(message.guild, "settings.doesNotExist");
        await message.channel.send(MessageFormatter.FailMessage(text));
        return false;
    }

    public async ResetSetting(message: Discord.Message, name: string): Promise<void>
    {
        const defaultValues = DefaultSettingsContainer.Values();
        if (!(name in defaultValues))
        {
            const text = await this._localizationService.Translate(message.guild, "settings.doesNotExist");
            await message.channel.send(MessageFormatter.FailMessage(text));
        }
        await SettingsModel.Delete(message.guild.id, name);
        const text = await this._localizationService.Translate(message.guild, "settings.reset");
        await message.channel.send(MessageFormatter.SuccessMessage(text));
    }

    public async PrintSetting(message: Discord.Message, name: string): Promise<void>
    {
        if (!this.CanPrint(name)) {
            const text = await this._localizationService.Translate(message.guild, "settings.doesNotExist");
            await message.channel.send(MessageFormatter.FailMessage(text));
            return;
        }

        const value = await this.Get(message.guild, name);

        if (value != null) {
            await message.channel.send(MessageFormatter.Message(value));
            return;
        }
        const text = await this._localizationService.Translate(message.guild, "settings.doesNotExist");
        await message.channel.send(MessageFormatter.FailMessage(text));
    }

    public CanPrint(name: string): boolean {
        const defaultValues = DefaultSettingsContainer.Values();

        if (name in defaultValues) {
            const element = defaultValues[name];
            return element.printable !== false;
        }

        return false;
    }
}

export default SettingsService;
