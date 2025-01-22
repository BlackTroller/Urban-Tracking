import DriverRouteCreate from "./DriverRouteCreate";

export const driverRoute = (permission ?: string) => {

    let dRoutes = null;

    if(!permission) return dRoutes;

    switch(permission){
        case "3" : { // ADMIN
            dRoutes = {
                create: <DriverRouteCreate/>,
                edit: <></>
            }
            break;
        }
        case "2" : { // ADMIN entidade
            dRoutes = {
                create: <DriverRouteCreate/>,
                edit: <></>
            }
            break;
        }
        default: {
            break;
        }
            
    }

    

    return dRoutes
}