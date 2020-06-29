import {ISetting, ISettings} from "../Features/Settings/Services/SettingsService";

class DefaultSettingsContainer
{
    private _defaultValues: ISettings = {}

    public Add(name: string, setting: ISetting): void {
        this._defaultValues[name] = setting;
    }

    public AddRange(settings: ISettings): void {
        const oldValues = this._defaultValues;
        this._defaultValues = {
            ...oldValues,
            ...settings
        }
    }

    public Values(): ISettings {
        return this._defaultValues;
    }
}

export default new DefaultSettingsContainer();
