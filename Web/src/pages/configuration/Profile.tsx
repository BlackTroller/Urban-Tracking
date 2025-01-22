import { Box } from "@mui/material";
import { 
    Edit, 
    useGetIdentity,
    Loading, 
    TextInput, 
    required, 
    PasswordInput,
    useAuthenticated, 
    SaveButton, 
    Toolbar, 
    useLocaleState, 
    useNotify, 
    useTheme, 
    TabbedForm, 
} from "react-admin";
import { Users } from "../../utils/types";
import validateUsersProfileForm from "../users/validators/UsersProfileValidation";

const EditActions = () => (
    <Toolbar>
        <SaveButton />
    </Toolbar>
);

const Profile = () => {

    useAuthenticated();

    const { data : identity, isLoading, refetch } = useGetIdentity();

    const onSettled = (data : Users) => {

        if(!data || !identity) return;

        localStorage.setItem('profile', JSON.stringify({
            id: data.id,
            fullName: data.name,
            avatar: '',
            entityId: identity.entityId
        }));

        if(identity) refetch();
    };

    return !isLoading && identity ? (
        <Edit 
        id={identity.id} 
        resource="user"  
        mutationMode="pessimistic"
        mutationOptions={{ onSettled }} 
        redirect={false} 
        title="ra.page.profile"
        >
            <TabbedForm validate={validateUsersProfileForm} toolbar={<EditActions/>} syncWithLocation={false}>
                <TabbedForm.Tab label={"ra.page.profile"}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" label="resources.utilizadores.fields.nome" validate={required()} />
                            </Box>
                            <Box flex={1} ml={{s: 0, md: '0.5em' }}>
                                <TextInput source="email" label="Email" validate={required()} fullWidth/>
                            </Box>                      
                        </Box>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} ml={{s: 0, md: '0.5em' }}>
                                <PasswordInput fullWidth source="password" label="resources.utilizadores.fields.password" />   
                            </Box>                      
                        </Box> 
                    </Box>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    ) : <Loading/>;
    
}

export default Profile;