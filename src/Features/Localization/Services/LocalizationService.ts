import AbstractService from "../../../Global/Base/AbstractService";
import LocalizationContainer from "../../../Container/LocalizationContainer";
import SettingsService from "../../Settings/Services/SettingsService";
import * as Discord from "discord.js"
import ServiceContainer from "../../../Container/ServiceContainer";

export interface ILocalization
{
    [key: string]: string;
}

export interface ILocalizationFiles
{
    [key: string]: ILocalization;
}

export interface ILocalizationParameters
{
    [key: string]: string;
}

class LocalizationService extends AbstractService
{
    public name = "LocalizationService";

    public async Translate(guild: Discord.Guild, message: string, parameters: ILocalizationParameters = {}): Promise<string> {
        const settingsService = ServiceContainer.Get<SettingsService>(SettingsService.name);

        const language = await settingsService.Get(guild, "Localization.Language");
        let msg = LocalizationContainer.Get(language, message);

        Object.keys(parameters).forEach(v => {
            const parameterValue = parameters[v];
            msg = msg.replace(`:${v}`, parameterValue);
        })

        return msg;
    }
}

export default LocalizationService;
