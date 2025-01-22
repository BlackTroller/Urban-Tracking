import { UsersCreate } from "./UsersCreate"
import { UsersEdit } from "./UsersEdit"
import { UsersList } from "./UsersList"

export const users = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "3" : { // ADMIN
            users = {
                list: UsersList,
                create: UsersCreate,
                edit: UsersEdit
            }
            break;
        }
        case "2" : { // ADMIN entidade
            users = {
                list: UsersList,
                create: UsersCreate,
                edit: UsersEdit
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}