import { Badge, Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { 
    usePermissions, 
    Edit, 
    TextInput, 
    required, 
    Loading, 
    useGetIdentity,
    TabbedForm,  
    useNotify ,
    SelectInput,
    BooleanInput,
    FunctionField,
    useDataProvider,
    List,
    Datagrid,
    WithRecord,
    TextField,
    TopToolbar,
    FilterButton,
    useListContext,
    UserIdentity,
} from "react-admin";
import validateEntitiesEditForm from "./validators/EntitiesEditValidation";
import { Entities, EntityDriver, Regions, Users } from "../../utils/types";
import ToolbarEditForm from "../../components/general/ToolbarEditForm";
import { Add, Delete } from '@mui/icons-material';
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { responsiveListFilter } from "../../components/general/customCSS";
import { userFilters } from "../users/UsersFilter";
import { getRoleLabel } from "../users/UsersList";

const ListActions = ({switchView, setView} : {switchView : boolean, setView: Dispatch<SetStateAction<boolean>>}) => {

    return(
    <TopToolbar>
        <AssociateButton switchView={switchView} setView={setView}/>
        <FilterButton/>
    </TopToolbar>
    );
};

const AssociateButton = ({switchView, setView} : {switchView : boolean, setView: Dispatch<SetStateAction<boolean>>}) => {

    return(
        <Button size="small" variant="outlined" onClick={() => setView(!switchView)}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
                <Badge/>
                <Typography sx={{ fontSize: '13px' }}>{!switchView ? "Associar Utilizador" : "Lista de Utilizadores"}</Typography>
            </Box>
        </Button>
    )
}

const AddAssociationButton = ({ record, entId } : { record: Users, entId : string }) => {

    const { refetch } = useListContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    
    const handleCreateDriver = async (userId: string, entityId: string) => {

        try{
            await dataProvider.create('entity/driver', {
                data: {
                    userId,
                    entityId
                }
            });

            refetch();

            notify('Associação criada', { type: 'success' });
        }
        catch{
            notify('Erro a criar associação', { type: 'error' });
        }
    
    }

    return(
        <Button onClick={() => handleCreateDriver(record.id, entId)}>
            <Add />
        </Button>
    )

}

const RemoveAssociationButton = ({ entityId }:{ entityId: string }) => {

    const { refetch } = useListContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    
    const handleSubmit = async (recordId: string) => {

        try{
            await dataProvider.delete('entity/driver', {
                id: recordId
            });

            refetch();

            notify('Associação eliminada', { type: 'success' });
        }
        catch{
            notify('Erro a eliminar associação', { type: 'error' });
        }
    
    }

    return (
        <Button color="error" onClick={() => handleSubmit(entityId)}>
            <Delete />
        </Button>
    )
}

export const EntitiesEdit = () => {

    const [regions, setRegions] = useState<Regions[]>([]);
    const [switchView, setView] = useState<boolean>(false); // troca de lista com lista de users sem entidade

    const notify = useNotify();
    const {permissions, isLoading} = usePermissions();
    const { identity, isLoading: loadingIdentity } = useGetIdentity();
    const dataProvider = useDataProvider(); // Usando o data provider para fazer a consulta

    const fetchRegions = async () => {
        try {
            const { data } = await dataProvider.getList('region', { // Substitua 'regions' pelo nome correto do recurso
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'name', order: 'ASC' },
                filter: {},
            });
            setRegions(data); // Armazenar as regiões no estado
        } catch (error) {
            notify('Erro a procurar regiões', { type: 'error' });
        }
    };

    useEffect(() => {

        fetchRegions();

    }, []);

    const transform = (data : Entities) => {
    
        return data
    };

    return !isLoading ? (
        <Edit 
        mutationMode="optimistic" 
        title="resources.entity.edit_title" 
        transform={transform}
        >
            <TabbedForm validate={validateEntitiesEditForm} toolbar={<ToolbarEditForm hasDelete={permissions && permissions == '3'}/>}>
                <TabbedForm.Tab label={"resources.entity.single"}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} label="resources.entity.fields.nome" validate={required()} />
                            </Box>      
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput 
                                    fullWidth 
                                    source="email" 
                                    label="resources.utilizadores.fields.email" 
                                    validate={required()} 
                                />
                            </Box>
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput 
                                    fullWidth 
                                    source="phone" 
                                    label="resources.entity.fields.phone" 
                                    validate={required()} 
                                />
                            </Box>                
                        </Box>
                        <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput 
                                    fullWidth 
                                    source="about" 
                                    label="resources.entity.fields.about" 
                                />
                            </Box>
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput 
                                    fullWidth 
                                    source="workHours" 
                                    label="resources.entity.fields.workHours" 
                                />
                            </Box>
                        </Box>
                        <Box >
                            <Box sx={{display: 'flex', gap: '100px', alignItems: 'center'}}>
                                    <SelectInput 
                                        label="resources.entity.fields.regionName" 
                                        source="regionId" // Assumindo que você está usando regionId como identificador
                                        choices={regions.map(region => ({ id: region.id, name: region.name }))} 
                                        validate={required()}  
                                    />
                            </Box>
                        </Box>
                        </Box>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                        <FunctionField label={false} render={(record : any) => identity && record.id!==identity.id && permissions == '3' 
                        ? 
                        <BooleanInput sx={{ width: 'max-content' }} label="resources.utilizadores.fields.ativo" source="active"  />
                        :  
                        null 
                        }/>
                        </Box> 
                    </Box>
                </TabbedForm.Tab>
                <TabbedForm.Tab label="resources.entity.drivers">
                    <WithRecord render={(entidade) => (
                        !loadingIdentity ? (
                            <Box sx={{ width: '100%' }}>
                                {!switchView ? (
                                    <List
                                        queryOptions={{ refetchOnWindowFocus: false }}
                                        pagination={<CustomPagination />}
                                        perPage={perPageDefault}
                                        filters={[]}
                                        actions={<ListActions switchView={switchView} setView={setView} />}
                                        empty={<CustomEmptyPage otherButton={<AssociateButton switchView={switchView} setView={setView} />} />}
                                        resource={`entity/driver/entity/${identity && identity.entityId ? identity.entityId : entidade.id}`}
                                        title=" "
                                        sx={{ paddingLeft: '10px', ...responsiveListFilter }}
                                    >
                                        <Datagrid bulkActionButtons={false}>
                                            <TextField source="username" label="Nome" />
                                                <Box sx={{ gap: '4px', float: 'right' }}>
                                                    <WithRecord
                                                        render={(record: EntityDriver) => (
                                                            <RemoveAssociationButton entityId={identity && identity.entityId ? identity.entityId : record.id} />
                                                        )}
                                                    />
                                                </Box>
                                        </Datagrid>
                                    </List>
                                ) : (
                                    <List
                                        queryOptions={{ refetchOnWindowFocus: false }}
                                        pagination={<CustomPagination />}
                                        perPage={perPageDefault}
                                        filters={userFilters(permissions)}
                                        actions={<ListActions switchView={switchView} setView={setView} />}
                                        empty={
                                            <CustomEmptyPage
                                                otherButton={<AssociateButton setView={setView} switchView={switchView} />}
                                            />
                                        }
                                        resource="user/no-entity"
                                        title=" "
                                        sx={{ paddingLeft: '10px', ...responsiveListFilter }}
                                    >
                                        <Datagrid bulkActionButtons={false}>
                                            <FunctionField
                                                label="resources.utilizadores.fields.nome"
                                                source="name"
                                                render={(record: Users) => (
                                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                        <Typography component="span" fontSize="14px">
                                                            {record.name}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            />
                                            {permissions === "3" && (
                                                <FunctionField
                                                    source="role"
                                                    label="resources.utilizadores.fields.roles"
                                                    render={(record: Users) => (
                                                        <Typography component="span" fontSize="14px">
                                                            {getRoleLabel(record.role)}
                                                        </Typography>
                                                    )}
                                                />
                                            )}          
                                            <Box sx={{ gap: '4px', float: 'right' }}>
                                                <WithRecord
                                                    render={(record: Users) => (
                                                        <AddAssociationButton record={record} entId={identity && identity.entityId ? identity.entityId : entidade.id} />
                                                    )}
                                                />
                                            </Box>
                                        </Datagrid>
                                    </List>
                                )}
                            </Box>
                        ) : (
                            <Loading />
                        )
                    )}/> 
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    ) : <Loading/>;
};