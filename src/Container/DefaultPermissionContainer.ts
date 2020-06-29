import {IDefaultPermission, IDefaultPermissions} from "../Features/Permission/Services/PermissionService";

class DefaultPermissionContainer
{
    private _defaultValues: IDefaultPermissions = {}

    public Add(name: string, permission: IDefaultPermission): void {
        this._defaultValues[name] = permission;
    }

    public AddRange(permissions: IDefaultPermissions): void {
        const oldValues = this._defaultValues;
        this._defaultValues = {
            ...oldValues,
            ...permissions
        }
    }

    public Values(): IDefaultPermissions {
        return this._defaultValues;
    }
}

export default new DefaultPermissionContainer();
