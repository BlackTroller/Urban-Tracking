import { AuditsList } from "./AuditsList"

export const audits = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "3" : { // ADMIN
            users = {
                list: AuditsList
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}