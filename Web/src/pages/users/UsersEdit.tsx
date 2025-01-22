import { Box } from "@mui/material";
import { 
    usePermissions, 
    Edit, 
    TextInput, 
    required, 
    BooleanInput, 
    FunctionField, 
    Loading, 
    useGetIdentity,
    PasswordInput, 
    TabbedForm, 
    WithRecord,  
    Datagrid, 
    Pagination, 
    DateField, 
    SelectInput,  
    List,
} from "react-admin";
import validateUsersEditForm from "./validators/UsersEditValidation";
import { Users } from "../../utils/types";
import ToolbarEditForm from "../../components/general/ToolbarEditForm";
import { url } from "../../App";

const themes = [
    {id: 'light', name: 'Light'},
    {id: 'dark', name: 'Dark'}
];


const langs = [
    { id: 'pt', name: 'Português' }, 
    { id: 'en', name: 'English' }, 
    { id: 'fr', name: 'Français' }
];

function formatLogo(value: any) {
    if (typeof value === "string") { // Value is null or the url string from the backend, wrap it in an object so the form input can handle it 
        return { src: url + value };
    } else {  // Else a new image is selected which results in a value object already having a preview link under the url key
      return value;
    }
}

export const UsersEdit = () => {

    const {permissions, isLoading} = usePermissions();
    const { identity } = useGetIdentity();

    const transform = (data : Users) => {

        if(data.password && data.password.trim().length===0){
            delete data.password
        }
    
        if(data.roles_ids){
            data.roles = data.roles_ids;
            delete data.roles_ids;
        }
    
       if(data.tempRoles) delete data.tempRoles;
    
        return data
    };

    return !isLoading ? (
        <Edit 
        mutationMode="optimistic" 
        resource=""
        title="resources.utilizadores.edit_title" 
        transform={transform}
        >
            <TabbedForm validate={validateUsersEditForm} toolbar={<ToolbarEditForm hasDelete={permissions && permissions == '3'}/>}>
                <TabbedForm.Tab label={"ra.page.profile"}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} label="resources.utilizadores.fields.nome" validate={required()} />
                            </Box>
                            <Box flex={1} ml={{s: 0, md: '0.5em' }}>
                                <TextInput source="email" label="Email" validate={required()} fullWidth/>
                            </Box>                      
                        </Box>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            {permissions == '3' && <Box flex={1} ml={{s: 0, md: '0.5em' }}>
                                <PasswordInput fullWidth source="password" inputProps={{ minLength: 6 }} label="resources.utilizadores.fields.password"  /> 
                            </Box>}                  
                        </Box>
                        <SelectInput
                            source="role"
                            label="Perfil"
                            fullWidth
                            choices={[
                                { id: "0", name: "Utilizador" },
                                { id: "1", name: "Condutor" },
                                { id: "2", name: "Admin Entidade" },
                                { id: "3", name: "Admin" },
                            ]}
                        />
                        <FunctionField label={false} render={(record : any) => identity && record.id!==identity.id && permissions == '3' 
                        ? 
                        <BooleanInput sx={{ width: 'max-content' }} label="resources.utilizadores.fields.ativo" source="active"  />
                        :  
                        null 
                        }/> 
                    </Box>
                </TabbedForm.Tab>
                {permissions=='3' && <TabbedForm.Tab label={'resources.app-users-sessions.name'}>
                    <Box sx={{ width: '100%' }}>
                        <WithRecord render={record =>(
                            <List
                                resource={`session/${record.id}`} 
                                sort={{ field: 'sessionDate', order: 'DESC' }}
                                perPage={10}
                                pagination={<Pagination />}
                                disableSyncWithLocation
                                actions={false}
                                title=" "
                                storeKey={"user_sessions"}
                            >
                                <Datagrid bulkActionButtons={false}>
                                    <DateField source="sessionDate" showTime />
                                </Datagrid>
                            </List>
                        )} />
                    </Box>
                </TabbedForm.Tab>}
            </TabbedForm>
        </Edit>
    ) : <Loading/>;
};