import { List, Datagrid, usePermissions, BooleanField, Loading, SimpleList, WithRecord, FunctionField} from "react-admin";
import { userFilters } from "./UsersFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Users } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { Edit, Delete } from '@mui/icons-material';
import CustomButtonToolTip, { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../components/general/customCSS";
import adjustDate from "../../components/general/adjustDate";

export const getRoleLabel = (role: string | number | undefined): string => {
    switch (role) {
        case "0": return "Utilizador";
        case "1": return "Condutor";
        case "2": return "Admin Entidade";
        case "3": return "Admin";
        default: return "Guest";
    }
};


export const UsersList = () => {

    const {permissions, isLoading} = usePermissions();

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));

    return !isLoading ? (
        <>
            <List  
            queryOptions={{ 
                refetchOnWindowFocus: false
            }} 
            pagination={<CustomPagination/>} 
            perPage={perPageDefault}
            filters={userFilters(permissions)} 
            empty={<CustomEmptyPage/>}  
            exporter={false} 
            title="resources.utilizadores.name"
            sx={{paddingLeft: '10px', ...responsiveListFilter}}
            >
                {isSmall 
                ? 
                <SimpleList 
                    primaryText={record => record.name} 
                    secondaryText={record => record.email} 
                    linkType={"edit"} /> 
                    
                : 
                <Datagrid bulkActionButtons={false}>
                    <FunctionField label="resources.utilizadores.fields.nome" source="name" render={(record : Users) => (
                        <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                            <Box sx={{marginTop: '-6px'}}>
                                <Typography component={"span"} fontSize="14px">{record.name}</Typography>
                            </Box>
                        </Box>
                    )}  />
                    <FunctionField label="resources.utilizadores.fields.email" source="email" render={(record : Users) => (
                        <Typography component={"span"} fontSize="14px">{record.email}</Typography>
                    )}  />
                    <FunctionField
                        source={'createdAt'}
                        label="resources.utilizadores.fields.createdAt" 
                        render={(record : Users) => record.createdAt ? `${adjustDate(record.createdAt)}` : null}
                    />
                    <FunctionField
                        source={'role'}
                        label="resources.utilizadores.fields.roles"
                        render={(record: Users) => (
                            <Typography component="span" fontSize="14px">
                                {getRoleLabel(record.role)}
                            </Typography>
                        )}
                    />
                    <BooleanField source="active" label="resources.utilizadores.fields.ativo" />
                    <Box sx={{gap: '4px', float: 'right'}}>
                        <WithRecord render={(record : Users) => {
                            return( 
                                <>
                                    <CustomButtonToolTip 
                                    icon={<Edit/>} 
                                    label={"ra.action.edit"} 
                                    action={"redirect"} 
                                    id={record.id} 
                                    resource={"user"}
                                    sx={commonListCSS}
                                    />
                                    <CustomConfirmButtonToolTip 
                                    sx={commonListCSS}
                                    label={"ra.action.delete"}
                                    color="error"
                                    icon={<Delete />} 
                                    id={record.id} 
                                    disabled={record.active ? false : true}
                                    resource={"user"}
                                    />
                                </>
                            )
                            }}
                        />
                    </Box>
                </Datagrid>

                }
            </List>
        </>
    ) : <Loading/>;
};
