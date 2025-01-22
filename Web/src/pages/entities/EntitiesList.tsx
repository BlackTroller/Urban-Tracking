import { List, Datagrid, usePermissions, Loading, SimpleList, WithRecord, FunctionField, BooleanField } from "react-admin";
import { EntityFilters } from "./EntitiesFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Entities } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { Edit, Delete } from '@mui/icons-material';
import CustomButtonToolTip, { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../components/general/customCSS";

export const EntitiesList = () => {

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
    filters={EntityFilters(permissions)} 
    empty={<CustomEmptyPage/>}  
    exporter={false} 
    title="resources.entity.name"
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        {isSmall 
        ? 
        <SimpleList 
            primaryText={record => record.name} 
            linkType={"edit"} /> 
            
        : 
        <Datagrid bulkActionButtons={false}>
            <FunctionField label="resources.entity.fields.nome" source="name" render={(record : Entities) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.name}</Typography>
                </Box>
            )}  />
            <FunctionField label="resources.entity.fields.email" source="email" render={(record : Entities) => (
                <Typography component={"span"} fontSize="14px">{record.email}</Typography>
            )}  />
            <FunctionField label="resources.entity.fields.phone" source="phone" render={(record : Entities) => (
                <Typography component={"span"} fontSize="14px">{record.phone}</Typography>
            )}  />
            <BooleanField source="active" label="resources.entity.fields.active" />
            <FunctionField label="resources.entity.fields.regionName" source="regionName" render={(record : Entities) => (
                <Typography component={"span"} fontSize="14px">{record.regionName}</Typography>
            )}  />
            <Box sx={{gap: '4px', float: 'right'}}>
                <WithRecord render={(record : Entities) => {
                    return( 
                        <>
                            <CustomButtonToolTip 
                            icon={<Edit/>} 
                            label={"ra.action.edit"} 
                            action={"redirect"} 
                            id={record.id} 
                            resource={"entity"}
                            sx={commonListCSS}
                            />
                            <CustomConfirmButtonToolTip 
                            sx={commonListCSS}
                            label={"ra.action.delete"}
                            color="error"
                            icon={<Delete />} 
                            id={record.id} 
                            resource={"entity"}
                            />
                        </>
                    )
                    }}
                />
            </Box>
        </Datagrid>

        }
    </List>) : <Loading/>;
};
