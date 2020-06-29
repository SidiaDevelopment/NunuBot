import AbstractGuildModel from "../../../Global/Base/AbstractGuildModel";
import {Setting} from "../../../Entity/Setting";

export interface ISerializedSetting
{
    name: string;
    value: string;
    guildId: string;
}

class SettingsModel extends AbstractGuildModel<ISerializedSetting, Setting>
{
    _expire = 20;

    protected async Load(guildId: string, name: string): Promise<Setting[]>
    {
        let setting = await Setting.find({name, guildId});

        if (setting == null || setting.length <= 0)
        {
            setting = await Setting.find({name, guildId: "global"});
        }

        return setting;
    }

    protected Mapping(entity: Setting): ISerializedSetting
    {
        return {
            name: entity.name,
            value: entity.value,
            guildId: entity.guildId,
        };
    }

    public async Update(guildId: string, name: string, value: string): Promise<void>
    {
        let setting = await Setting.findOne({name, guildId});

        if (setting == null) {
            setting = new Setting;
            setting.name = name;
            setting.guildId = guildId;
        }

        setting.value = value;
        await setting.save()
    }

    public async Delete(guildId: string, name: string): Promise<void> {
        await Setting.delete({name, guildId});
    }
}

export default new SettingsModel();
