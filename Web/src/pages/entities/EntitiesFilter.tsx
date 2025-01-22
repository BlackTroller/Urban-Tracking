import { TextInput } from "react-admin";

export const EntityFilters = (permission : string) => {

    let filters = [
        <TextInput source="name" size="small" label={'pos.labels.search'} fullWidth alwaysOn resettable={true}/>,
    ];

    switch(permission){
        case '2':
            filters.push();
            break;
        case '3':
            filters.push();
            break;
        default:
            break;
    }

    return filters;

}