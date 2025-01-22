import { useState, useEffect } from "react";
import {
    Create, 
    SimpleForm, 
    TextInput, 
    required, 
    useTranslate,
    SelectInput,
    useDataProvider, 
} from "react-admin";
import ToolbarCreateForm from "../../components/general/ToolbarCreateForm";
import validateRoutesCreateForm from "./validators/RoutesCreateValidation";
import { Box } from '@mui/material';

export const RoutesCreate = () => {

    const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
    const [entities, setEntities] = useState<{ id: string; name: string }[]>([]);
    const [isChecked, setChecked] = useState<boolean>(true);

    const translate = useTranslate();
    const dataProvider = useDataProvider();
 
    useEffect(() => {
        const fetchRegions = async () => {
            const regionsResponse = await dataProvider.getList("region", {
                pagination: { page: 1, perPage: 100 },
                sort: { field: "name", order: "ASC" },
                filter: {},
            });
            setRegions(regionsResponse.data);
        };

        const fetchEntities = async () => {
            const entitiesResponse = await dataProvider.getList("entity", {
                pagination: { page: 1, perPage: 100 },
                sort: { field: "name", order: "ASC" },
                filter: {},
            });
            setEntities(entitiesResponse.data);
        };

        fetchRegions();
        fetchEntities();
    }, [dataProvider]);


    const transform = (data : any) => {
        return data
    };

    return(
        <Create transform={transform} title="resources.route.create_title">
            <SimpleForm  defaultValues={{active : true}} validate={values => validateRoutesCreateForm(values, isChecked)} toolbar={<ToolbarCreateForm/>}>
                <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}}}>
                    <Box width={'100%'}>
                        <Box>
                            <Box sx={{display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' }}}>
                                <Box flex={1} >
                                    <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} autoComplete="off" label="resources.route.fields.nome" validate={required()} />
                                </Box>                  
                            </Box>
                            <Box flex={1}>
                                    <SelectInput
                                        fullWidth
                                        source="regionId"
                                        label="resources.route.fields.region"
                                        choices={regions.map((region) => ({
                                            id: region.id,
                                            name: region.name,
                                        }))}
                                        validate={required()}
                                    />
                                </Box>

                                <Box flex={1}>
                                    <SelectInput
                                        fullWidth
                                        source="entityId"
                                        label="resources.route.fields.entity"
                                        choices={entities.map((entity) => ({
                                            id: entity.id,
                                            name: entity.name,
                                        }))}
                                        validate={required()}
                                    />
                                </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    );
};