// import { RoleCreate } from "./RoleCreate";
// import { RoleEdit } from "./RoleEdit";
import { RoleList } from "./RoleList";

export const roles = (permission?: string) => {
    
    if(!permission) return null;

    let roles = { 
        list: RoleList,
        // create: RoleCreate,
        // edit: RoleEdit 
    }

    return permission == '3' ? roles : null
}