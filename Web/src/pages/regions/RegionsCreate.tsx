import { useState } from "react";
import {
    Create, 
    SimpleForm, 
    TextInput, 
    required, 
    useTranslate, 
} from "react-admin";
import ToolbarCreateForm from "../../components/general/ToolbarCreateForm";
import validateRegionsCreateForm from "./validators/RegionsCreateValidation";
import { Box } from '@mui/material';

export const RegionsCreate = () => {

    const [isChecked, setChecked] = useState<boolean>(true);

    const transform = (data : any) => {
        return data
    };

    return(
        <Create transform={transform} title="resources.region.create_title">
            <SimpleForm  defaultValues={{active : true}} validate={values => validateRegionsCreateForm(values, isChecked)} toolbar={<ToolbarCreateForm/>}>
                <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'none', md:'wrap'}}}>
                    <Box width={'100%'}>
                        <Box>
                            <Box sx={{display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' }}}>
                                <Box flex={1} >
                                    <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} autoComplete="off" label="resources.region.fields.nome" validate={required()} />
                                </Box>                  
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    );
};