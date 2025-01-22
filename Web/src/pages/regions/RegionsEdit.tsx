import { Box } from "@mui/material";
import { 
    usePermissions, 
    Edit, 
    TextInput, 
    required, 
    Loading, 
    TabbedForm,  
} from "react-admin";
import validateRegionsEditForm from "./validators/RegionsEditValidation";
import { Regions } from "../../utils/types";
import ToolbarEditForm from "../../components/general/ToolbarEditForm";

export const RegionsEdit = () => {

    const {permissions, isLoading} = usePermissions();

    const transform = (data : Regions) => {
    
        return data
    };

    return !isLoading ? (
        <Edit 
        mutationMode="optimistic" 
        resource=""
        title="resources.region.edit_title" 
        transform={transform}
        >
            <TabbedForm validate={validateRegionsEditForm} toolbar={<ToolbarEditForm hasDelete={permissions && permissions == '3'}/>}>
                <TabbedForm.Tab label={"ra.page.profile"}>
                    <Box width={'100%'} display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}}}>
                        <Box display={{s: 'block', md: 'flex'}} sx={{flexWrap: {xs: 'nowrap', md:'wrap'}, width: '100%'}} >
                            <Box flex={1} mr={{s: 0, md: '0.5em' }}>
                                <TextInput fullWidth source="name" inputProps={{ minLength: 3 }} label="resources.region.fields.nome" validate={required()} />
                            </Box>                   
                        </Box>
                    </Box>
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    ) : <Loading/>;
};