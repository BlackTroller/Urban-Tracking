import { useState } from "react";
import {
    Create, 
    SimpleForm, 
    TextInput, 
    required, 
    PasswordInput, 
    useTranslate, 
    SelectInput,
    usePermissions
} from "react-admin";
import ToolbarCreateForm from "../../components/general/ToolbarCreateForm";
import validateUsersCreateForm from "./validators/UsersCreateValidation";
import { Box } from '@mui/material';


export const UsersCreate = () => {
    const [userName, setUserName] = useState<string>('');
    const [isChecked, setChecked] = useState<boolean>(true);
    const { permissions } = usePermissions();

    const translate = useTranslate(); 

    const transform = (data : any) => {

        if(isChecked && userName.length > 0){
            data.username = userName;
        }

        if(!data.role) data.role = "2"
        return data
    };

    return(
        <Create transform={transform} title="resources.utilizadores.create_title">
            <SimpleForm  defaultValues={{active : true}} validate={values => validateUsersCreateForm(values, isChecked)} toolbar={<ToolbarCreateForm/>}>
                <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}}}>
                    <Box width={'100%'}>
                        <Box>
                            <Box sx={{display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' }}}>
                                <Box flex={1} >
                                    <TextInput fullWidth source="name" inputProps={{ minLength: 6 }} autoComplete="off" label="resources.utilizadores.fields.nome" validate={required()} />
                                </Box>
                                <Box flex={1} >
                                    <TextInput source="email" autoComplete="off" inputProps={{ minLength: 6 }} type="email" label="Email" validate={required()} fullWidth/>
                                </Box>                      
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' }}}>
                            <Box flex={1} >
                                <PasswordInput fullWidth source="password" inputProps={{ minLength: 6 }} autoComplete="off" label="resources.utilizadores.fields.password" validate={required()} />        
                            </Box>
                        </Box>
                        <Box>
                        { permissions && permissions  == "3" ? <SelectInput 
                                source="role"
                                label="resources.utilizadores.fields.roles"
                                fullWidth
                                choices={[
                                    { id: "0", name: "Utilizador" },
                                    { id: "1", name: "Condutor" },
                                    { id: "2", name: "Admin Entidade" },
                                    { id: "3", name: "Admin" },
                                ]}
                                validate={required()}
                                
                            /> : <></>}
                            
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    );
};