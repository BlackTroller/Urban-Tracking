import { List, Datagrid, usePermissions, Loading, SimpleList, WithRecord, FunctionField } from "react-admin";
import { RegionFilters } from "./RegionsFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Regions } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { Edit, Delete } from '@mui/icons-material';
import CustomButtonToolTip, { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../components/general/customCSS";

export const RegionsList = () => {

    const {permissions, isLoading} = usePermissions();

    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));

    return !isLoading ? (
    <List  
    queryOptions={{ 
        refetchOnWindowFocus: false
    }} 
    pagination={<CustomPagination/>} 
    perPage={perPageDefault} 
    filters={RegionFilters(permissions)} 
    empty={<CustomEmptyPage/>}  
    exporter={false} 
    title="resources.region.name"
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        {isSmall 
        ? 
        <SimpleList 
            primaryText={record => record.name} 
            linkType={"edit"} /> 
            
        : 
        <Datagrid bulkActionButtons={false}>
            <FunctionField fullWidth label="resources.region.fields.nome" source="name" render={(record : Regions) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.name}</Typography>
                </Box>
            )}  />
            {permissions && permissions == "3" && <Box sx={{gap: '4px', float: 'right'}}>
                <WithRecord render={(record : Regions) => {
                    return( 
                        <>
                            <CustomButtonToolTip 
                            icon={<Edit/>} 
                            label={"ra.action.edit"} 
                            action={"redirect"} 
                            id={record.id} 
                            resource={"region"}
                            sx={commonListCSS}
                            />
                            <CustomConfirmButtonToolTip 
                            sx={commonListCSS}
                            label={"ra.action.delete"}
                            color="error"
                            icon={<Delete />} 
                            id={record.id} 
                            resource={"region"}
                            />
                        </>
                    )
                    }}
                />
            </Box>}
        </Datagrid>

        }
    </List>) : <Loading/>;
};
