import { Datagrid, FunctionField, List, TextField, useRedirect, WithRecord } from "react-admin";
import { Box, Button, Typography } from '@mui/material';
import { Delete,Add } from '@mui/icons-material';
import { DriverRoutes, Routes } from "../../utils/types";
import CustomPagination, { perPageDefault } from "../../components/general/CustomPagination";
import CustomEmptyPage from "../../components/general/CustomEmptyPage";
import { responsiveListFilter } from "../../components/general/customCSS";
import { commonListCSS } from "../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../components/general/CustomConfirmButtonToolTip";
import extractTimeFromTimestamp from "../../components/general/extractTime";

const AddButton = ({ routeId } : { routeId : string }) => {

    const redirectTo = useRedirect();

    const onClick = () => {
        redirectTo(`../../driverRoute/create?from_route=${routeId}`);
    }

    return(
        <Box sx={{ paddingLeft: '10px' }}>
            <Button sx={{ paddingLeft: '10px' }} variant="outlined" onClick={() => onClick()}>
                <Add sx={{ padding: '0px' }}/>
                <Typography sx={{ fontSize: '13px' }}>Criar rota de condutor</Typography>
            </Button>
        </Box>
    )
};

//Usar apenas no <TabbedForm> da Route
const DriverRouteList = ({ record }: {record : Routes}) => {

    return (
        <>
            <AddButton routeId={record.id} />
            <List
            queryOptions={{ 
                refetchOnWindowFocus: false
            }}
            actions={false}
            pagination={<CustomPagination/>} 
            resource={`driverRoute/by-route/${record.id}`}
            perPage={perPageDefault}
            empty={<CustomEmptyPage/>}  
            exporter={false} 
            title=" "
            sx={{paddingLeft: '10px', ...responsiveListFilter}}
            >
                <Datagrid bulkActionButtons={false}>
                    <TextField source="username" label="Nome"/>
                    <FunctionField
                    sortable={false}
                    label="Dias de trabalho"
                    render={(record: DriverRoutes) => {
                        const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
                        const availability = record.workDays.split(""); // Assuming record.someField = "0111101"

                        return (
                        <Box display="flex" gap={2}>
                            {availability.map((char : string, index : number) => (
                            <Box key={index} textAlign="center">
                                <span style={{ color: char === "1" ? "green" : "red" }}>
                                {daysOfWeek[index]}
                                </span>
                            </Box>
                            ))}
                        </Box>
                        );
                    }}
                    />
                    <FunctionField label="Inicio" sortable={false} render={(record : DriverRoutes) => extractTimeFromTimestamp(record.startTime)} />
                    <FunctionField label="Fim" sortable={false} render={(record : DriverRoutes) => extractTimeFromTimestamp(record.endTime)} />
                    <Box sx={{gap: '4px', float: 'right'}}>
                        <WithRecord render={(record : DriverRoutes) => {
                            return( 
                                <>
                                    <CustomConfirmButtonToolTip 
                                    sx={commonListCSS}
                                    label={"ra.action.delete"}
                                    color="error"
                                    icon={<Delete />} 
                                    id={record.id}
                                    resource={`driverRoute`}
                                    />
                                </>
                            )
                            }}
                        />
                    </Box>
                </Datagrid>
            </List>
        </>
        
    )
}

export default DriverRouteList;