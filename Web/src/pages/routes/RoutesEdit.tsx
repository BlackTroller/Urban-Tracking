import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { 
    usePermissions, 
    Edit, 
    TextInput, 
    required, 
    Loading, 
    TabbedForm,  
    useDataProvider,
    SelectInput,
    WithRecord,
} from "react-admin";
import validateRoutesEditForm from "./validators/RoutesEditValidation";
import { useParams } from "react-router-dom"; // Importa o useParams
import { Routes } from "../../utils/types";
import ToolbarEditForm from "../../components/general/ToolbarEditForm";
import { StopsList } from "./components/StopsList";
import DriverRouteList from "../driverRoute/DriverRouteList";

const transform = (data : Routes) => {
    const { stopId, ...rest } = data; // Remove a propriedade stopId
    console.log(rest);
    return rest; // Retorna o restante do objeto sem stopId
};

export const RoutesEdit = () => {

    const [regions, setRegions] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);

    const {permissions, isLoading} = usePermissions();

    const dataProvider = useDataProvider();

    // Fetch regions, entities, and stops when component mounts
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

    return !isLoading ? (
        <Edit 
        mutationMode="optimistic" 
        title="resources.route.edit_title" 
        transform={transform}
        >
            <TabbedForm validate={validateRoutesEditForm} toolbar={<ToolbarEditForm hasDelete={permissions && permissions == '3'}/>}>
                <TabbedForm.Tab label={"resources.route.single"}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} label="resources.route.fields.nome" validate={required()} />
                            </Box>                   
                        </Box>
                        <Box flex={1} mr={{ s: 0, md: "0.5em" }}>
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
                        <Box flex={1} mr={{ s: 0, md: "0.5em" }}>
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
                    <Box sx={{width: '100%'}}>
                        <StopsList/>
                    </Box> 
                </TabbedForm.Tab>
                <TabbedForm.Tab label={"resources.route.driverroute"}>
                    <Box sx={{ width: '100%' }}>
                        <WithRecord render={(record) => <DriverRouteList record={record}/>} />
                    </Box>
                </TabbedForm.Tab>
            </TabbedForm>
            
        </Edit>
    ) : <Loading/>;
};