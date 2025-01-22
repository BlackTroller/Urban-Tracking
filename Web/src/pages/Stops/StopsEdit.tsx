import { Box } from "@mui/material";
import { 
    usePermissions, 
    Edit, 
    TextInput, 
    required, 
    Loading, 
    SimpleForm,
} from "react-admin";
import validateStopsEditForm from "./validators/StopsEdtiValidation";
import ToolbarEditForm from "../../components/general/ToolbarEditForm";
import { CoordinatePicker } from "./components/CoordinatePicker";

export const StopsEdit = () => {

    const {permissions, isLoading} = usePermissions();


    const transform = (data : any) => {
        
        console.log(data);
        
        return data;
    };

    return !isLoading ? (
        <Edit 
        mutationMode="optimistic" 
        title="resources.stop.edit_title" 
        transform={transform}
        >
            <SimpleForm validate={validateStopsEditForm} toolbar={<ToolbarEditForm hasDelete={permissions && permissions == '3'}/>}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} label="resources.stop.fields.nome" validate={required()} />
                            </Box>
                            <CoordinatePicker
                                sourceLat="latitude" 
                                sourceLng="longitude" 
                            />                    
                        </Box>
                    </Box>
            </SimpleForm>
        </Edit>
    ) : <Loading/>;
};