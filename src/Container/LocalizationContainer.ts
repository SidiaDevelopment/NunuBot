import {ILocalization, ILocalizationFiles} from "../Features/Localization/Services/LocalizationService";
import Logger, {LogLevel} from "../Features/Logging/Helper/Logger";

class LocalizationContainer
{
    private _values: ILocalizationFiles = {}

    public AddRange(localizationFiles: ILocalizationFiles): void
    {
        for (const localizationFilesKey in localizationFiles)
        {
            if (!localizationFiles.hasOwnProperty(localizationFilesKey)) continue;

            const file = localizationFiles[localizationFilesKey];
            this.Add(localizationFilesKey, file);
        }
    }

    public Add(language: string, file: ILocalization)
    {
        if (!(language in this._values))
        {
            this._values[language] = {};
        }

        this._values[language] = {
            ...this._values[language],
            ...file
        }
    }

    public Get(language: string, name: string)
    {
        if (!(language in this._values))
        {
            Logger.log(LogLevel.Error, "LocalizationContainer: Wrong language provided:", language);
            return "ERROR: Wrong language provided";
        }

        if (!(name in this._values[language]))
        {
            Logger.log(LogLevel.Error, "LocalizationContainer: Wrong text provided:", name);
            return "ERROR: Wrong language provided";
        }

        return this._values[language][name];
    }
}

export default new LocalizationContainer();
