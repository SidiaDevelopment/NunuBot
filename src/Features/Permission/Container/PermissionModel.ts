import AbstractGuildModel from "../../../Global/Base/AbstractGuildModel";
import {Permission} from "../../../Entity/Permission";

interface IPermission
{
    name: string;
    guildId: string;
    roleId: string;
}

class PermissionModel extends AbstractGuildModel<IPermission, Permission>
{
    _expire = 20;

    protected async Load(guildId: string, name: string): Promise<Permission[]>
    {
        const permission = await Permission.find({name, guildId});

        return permission;
    }

    protected Mapping(entity: Permission): IPermission
    {
        return {
            name: entity.name,
            guildId: entity.guildId,
            roleId: entity.role
        };
    }

}

export default new PermissionModel();
