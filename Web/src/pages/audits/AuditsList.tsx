import { List, Datagrid, usePermissions, Loading, SimpleList, WithRecord, FunctionField, useDataProvider } from "react-admin";
import { AuditsFilters } from "./AuditsFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Audits } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { responsiveListFilter } from "../../components/general/customCSS";
import adjustDate from "../../components/general/adjustDate";
import { useState, useEffect } from "react";

export const AuditsList = () => {

    const dataProvider = useDataProvider();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const {permissions, isLoading} = usePermissions();

    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse] = await Promise.all([
                    dataProvider.getList('user', { pagination: { page: 1, perPage: 100 }, sort: { field: 'name', order: 'ASC' }, filter: {} }),
                ]);

                setUsers(usersResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataProvider]);

    const getUserName = (userId: string): string => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Deleted User";
    };

    return !isLoading ? (
    <List  
    queryOptions={{ 
        refetchOnWindowFocus: false
    }} 
    pagination={<CustomPagination/>} 
    perPage={perPageDefault} 
    filters={AuditsFilters(permissions)} 
    empty={<CustomEmptyPage/>}  
    exporter={false} 
    title="resources.audit.name"
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        {isSmall 
        ? 
        <SimpleList 
            primaryText={record => record.action}
            linkType={"edit"} /> 
            
        : 
        <Datagrid bulkActionButtons={false}>
            <FunctionField 
                label="resources.audit.fields.nome" 
                source="userId" 
                render={(record : Audits) => getUserName(record.userId)}  
            />
            <FunctionField label="resources.audit.fields.resource" source="resource" render={(record : Audits) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.resource}</Typography>
                </Box>
            )}  />
            <FunctionField label="resources.audit.fields.resourceId" source="resourceId" render={(record : Audits) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.resourceId}</Typography>
                </Box>
            )}  />
           <FunctionField 
                label="resources.audit.fields.action" 
                source="action" 
                render={(record: Audits) => (
                        <Typography sx={{
                            maxWidth: '90px',
                            minWidth: 'max-content',
                            backgroundColor: record.action === 'Update' ? 'orange' : record.action === 'Delete' ? 'red' : 'transparent', 
                            textAlign: "center",
                            fontSize: "15px",
                            padding: '8px',
                            borderRadius: '15px',
                            fontWeight: 'bold',
                        }} >
                            {record.action}
                        </Typography>
                )}  
            />
            <FunctionField
                source={'logDate'}
                label="resources.audit.fields.logDate" 
                render={(record : Audits) => record.logDate ? `${adjustDate(record.logDate)}` : null}
            />
        </Datagrid>

        }
    </List>) : <Loading/>;
};
