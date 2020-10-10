import {IPermission, IPermissions} from "../Features/Permission/Services/PermissionService";

class DefaultPermissionContainer
{
    private _defaultValues: IPermissions = {}

    public Add(name: string, permission: IPermission): void {
        this._defaultValues[name] = permission;
    }

    public AddRange(permissions: IPermissions): void {
        const oldValues = this._defaultValues;
        this._defaultValues = {
            ...oldValues,
            ...permissions
        }
    }

    public Values(): IPermissions {
        return this._defaultValues;
    }
}

export default new DefaultPermissionContainer();
