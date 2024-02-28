export class InsertPermissionParam {
    userId?: number;
    menuId?: number;
    permission?: string;
    isAllow?: boolean;
}

export interface PermissionViewModel {
    permission: string;
}