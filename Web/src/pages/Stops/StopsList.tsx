import { List, Datagrid, usePermissions, Loading, SimpleList, WithRecord, FunctionField, BooleanField } from "react-admin";
import { StopFilters } from "./StopsFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Stops } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { Edit, Delete } from '@mui/icons-material';
import CustomButtonToolTip, { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../components/general/customCSS";

export const StopsList = () => {

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
    filters={StopFilters(permissions)} 
    empty={<CustomEmptyPage/>}  
    exporter={false} 
    title="resources.stop.name"
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        {isSmall 
        ? 
        <SimpleList 
            primaryText={record => record.name} 
            linkType={"edit"} /> 
            
        : 
        <Datagrid bulkActionButtons={false}>
            <FunctionField fullWidth label="resources.stop.fields.nome" source="name" render={(record : Stops) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.name}</Typography>
                </Box>
            )}  />
            <FunctionField fullWidth label="resources.stop.fields.latitude" source="latitude" render={(record : Stops) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.latitude}</Typography>
                </Box>
            )}  />
            <FunctionField fullWidth label="resources.stop.fields.longitude" source="longitude" render={(record : Stops) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.longitude}</Typography>
                </Box>
            )}  />
            <Box>
                <BooleanField source="active" label="resources.utilizadores.fields.ativo" />
            </Box>
            <Box sx={{gap: '4px', float: 'right'}}>
                {permissions && permissions == "3" && <WithRecord render={(record : Stops) => {
                    return( 
                        <>
                            <CustomButtonToolTip 
                            icon={<Edit/>} 
                            label={"ra.action.edit"} 
                            action={"redirect"} 
                            id={record.id} 
                            resource={"stop"}
                            sx={commonListCSS}
                            />
                            <CustomConfirmButtonToolTip 
                            sx={commonListCSS}
                            label={"ra.action.delete"}
                            color="error"
                            icon={<Delete />} 
                            id={record.id} 
                            resource={"stop"}
                            />
                        </>
                    )
                    }}
                />}
            </Box>
        </Datagrid>

        }
    </List>) : <Loading/>;
};
