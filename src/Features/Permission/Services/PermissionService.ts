import AbstractService from "../../../Global/Base/AbstractService";
import PermissionModel from "../Container/PermissionModel";
import * as Discord from "discord.js";

class PermissionService extends AbstractService
{
    public name = "PermissionService";

    public async HasPermission(guild: Discord.Guild, name: string, member: Discord.GuildMember): Promise<boolean>
    {
        const permissions = await PermissionModel.Get(guild.id, name);

        if (permissions == null) return false;

        for (const v of permissions)
        {
            if (member.roles.cache.has(v.roleId))
            {
                return true;
            }
        }

        return false;
    }

    public StartUp()
    {
        super.StartUp();
    }
}

export default PermissionService;
