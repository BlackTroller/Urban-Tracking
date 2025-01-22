import { TextInput } from "react-admin";

export const AuditsFilters = (permission : string) => {

    let filters = [
        <TextInput source="resource" size="small" label={'pos.labels.search'} fullWidth alwaysOn resettable={true}/>
    ];

    switch(permission){
        case '3':
            filters.push();
            break;
        default:
            break;
    }

    return filters;

}