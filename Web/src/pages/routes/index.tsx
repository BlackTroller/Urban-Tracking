import { RoutesCreate } from "./RoutesCreate"
import { RoutesEdit } from "./RoutesEdit"
import { RoutesList } from "./RoutesList"

export const routes = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "3" : { // ADMIN
            users = {
                list: RoutesList,
                create: RoutesCreate,
                edit: RoutesEdit
            }
            break;
        }
        case "2" : { // ADMIN entidade
            users = {
                list: RoutesList,
                create: RoutesCreate,
                edit: RoutesEdit
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}