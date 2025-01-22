import { useEffect, useState } from "react";
import { List, Datagrid, usePermissions, Loading, SimpleList, WithRecord, FunctionField, BooleanField, useDataProvider } from "react-admin";
import { RoutesFilters } from "./RoutesFilter";
import { Box, useTheme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { Routes } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import { Edit, Delete } from '@mui/icons-material';
import CustomButtonToolTip, { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../components/general/customCSS";

export const RoutesList = () => {

    const {permissions, isLoading} = usePermissions();

    const theme = useTheme();

    const isSmall = useMediaQuery(theme.breakpoints.down('lg'));

    const dataProvider = useDataProvider();

    // Estados para armazenar os valores de regions e entities
    const [regions, setRegions] = useState<any[]>([]);
    const [entities, setEntities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [regionsResponse, entitiesResponse] = await Promise.all([
                    dataProvider.getList('region', { pagination: { page: 1, perPage: 100 }, sort: { field: 'name', order: 'ASC' }, filter: {} }),
                    dataProvider.getList('entity', { pagination: { page: 1, perPage: 100 }, sort: { field: 'name', order: 'ASC' }, filter: {} })
                ]);

                setRegions(regionsResponse.data);
                setEntities(entitiesResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataProvider]);

     // Mapeia o ID para o nome de região
     const getRegionName = (regionId: string): string => {
        const region = regions.find((region) => region.id === regionId);
        return region ? region.name : "Desconhecido";
    };

    // Mapeia o ID para o nome de entidade
    const getEntityName = (entityId: string): string => {
        const entity = entities.find((entity) => entity.id === entityId);
        return entity ? entity.name : "Desconhecido";
    };

    return !isLoading ? (
    <List  
    queryOptions={{ 
        refetchOnWindowFocus: false
    }} 
    pagination={<CustomPagination/>} 
    perPage={perPageDefault} 
    filters={RoutesFilters(permissions)} 
    empty={<CustomEmptyPage/>}  
    exporter={false} 
    title="resources.route.name"
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        {isSmall 
        ? 
        <SimpleList 
            primaryText={record => record.name} 
            linkType={"edit"} /> 
            
        : 
        <Datagrid bulkActionButtons={false}>
            <FunctionField label="resources.route.fields.nome" source="name" render={(record : Routes) => (
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <Typography component={"span"} fontSize="15px">{record.name}</Typography>
                </Box>
            )}  />
            <FunctionField
                    label="resources.route.fields.region"
                    source="regionId"
                    render={(record : Routes) => getRegionName(record.regionId)}
                />
                <FunctionField
                    label="resources.route.fields.entity"
                    source="entityId"
                    render={(record : Routes) => getEntityName(record.entityId)}
                />
            <BooleanField source="active" label="resources.route.fields.ativo" />
            <Box sx={{gap: '4px', float: 'right'}}>
                <WithRecord render={(record : Routes) => {
                    return( 
                        <>
                            <CustomButtonToolTip 
                            icon={<Edit/>} 
                            label={"ra.action.edit"} 
                            action={"redirect"} 
                            id={record.id} 
                            resource={"route"}
                            sx={commonListCSS}
                            />
                            <CustomConfirmButtonToolTip 
                            sx={commonListCSS}
                            label={"ra.action.delete"}
                            color="error"
                            icon={<Delete />} 
                            id={record.id} 
                            resource={"route"}
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
