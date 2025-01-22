import { RegionsCreate } from "./RegionsCreate"
import { RegionsEdit } from "./RegionsEdit"
import { RegionsList } from "./RegionsList"

export const regions = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "3" : { // ADMIN
            users = {
                list: RegionsList,
                create: RegionsCreate,
                edit: RegionsEdit
            }
            break;
        }
        case "2" : { // ADMIN entidade
            users = {
                list: RegionsList, 
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}