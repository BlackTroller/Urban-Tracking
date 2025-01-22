import { StopsCreate } from "./StopsCreate"
import { StopsEdit } from "./StopsEdit"
import { StopsList } from "./StopsList"

export const stops = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "3" : { // ADMIN
            users = {
                list: StopsList,
                create: StopsCreate,
                edit: StopsEdit
            }
            break;
        }
        case "2" : { // ADMIN entidade
            users = {
                list: StopsList
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}