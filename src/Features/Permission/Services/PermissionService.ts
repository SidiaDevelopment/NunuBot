import AbstractService from "../../../Global/Base/AbstractService";
import PermissionModel from "../Models/PermissionModel";
import * as Discord from "discord.js";
import DefaultPermissionContainer from "../../../Container/DefaultPermissionContainer";

export interface IDefaultPermission {
    allowByDefault?: boolean;
    defaultStrategy?: () => boolean;
    grantFor?: Discord.PermissionResolvable
}

export interface IDefaultPermissions {
    [key: string]: IDefaultPermission;
}

class PermissionService extends AbstractService
{
    public name = "PermissionService";

    public async HasPermission(guild: Discord.Guild, name: string, member: Discord.GuildMember): Promise<boolean>
    {
        if (member.hasPermission("ADMINISTRATOR")) {
            return true;
        }

        const permissions = await PermissionModel.Get(guild.id, name);

        if (permissions == null || permissions.length <= 0) {
            const defaultValues = DefaultPermissionContainer.Values();

            if (name in defaultValues) {
                const permission = defaultValues[name];
                if (permission.defaultStrategy) {
                    return permission.defaultStrategy();
                }
                if (permission.allowByDefault) {
                    return true;
                }
                if (permission.grantFor) {
                    return member.hasPermission(permission.grantFor);
                }

                return false;
            }
        }

        for (const v of permissions)
        {
            if (member.roles.cache.has(v.roleId) || v.roleId == "all")
            {
                return true;
            }
        }

        return false;
    }

    public StartUp(): void
    {
        super.StartUp();
    }
}

export default PermissionService;
