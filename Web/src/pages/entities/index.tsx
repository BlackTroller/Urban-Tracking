import { EntitiesCreate } from "./EntitiesCreate"
import { EntitiesEdit } from "./EntitiesEdit"
import { EntitiesList } from "./EntitiesList"

export const entities = (permission ?: string) => {

    let users = null;

    if(!permission) return users;

    switch(permission){
        case "2": { //ADMIN ENTIDADE
            users = {
                list: EntitiesList,
                edit: EntitiesEdit,
            }
            break;
        }
        case "3" : { // ADMIN
            users = {
                list: EntitiesList,
                create: EntitiesCreate,
                edit: EntitiesEdit
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return users
}