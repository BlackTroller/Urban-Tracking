import { TextInput } from "react-admin";

export const RoutesFilters = (permission : string) => {

    let filters = [
        <TextInput source="name" size="small" label={'pos.labels.search'} fullWidth alwaysOn resettable={true}/>,
    ];

    switch(permission){
        case '3':
            filters.push();
            break;
        case '2':
            filters.push();
            break;
        default:
            break;
    }

    return filters;

}