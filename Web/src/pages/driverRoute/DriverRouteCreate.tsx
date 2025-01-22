import { AutocompleteInput, CheckboxGroupInput, Create, DateInput, DateTimeInput, Loading, ReferenceInput, required, SimpleForm, TimeInput, useGetIdentity, useNotify, usePermissions, useRedirect } from 'react-admin';
import { useSearchParams } from 'react-router-dom';
import ToolbarCreateForm from '../../components/general/ToolbarCreateForm';
import { Box } from '@mui/material';
import { identity } from 'lodash';
import SimpleTimeInput from '../../components/general/SimpleTimeInput';

const DriverRouteCreate = () => {

    const[searchParams] = useSearchParams();
    const { permissions, isLoading } = usePermissions();
    const { data:identity, isLoading:identityLoading} = useGetIdentity();
    const notify = useNotify();
    const redirectTo = useRedirect();

    const routeId = searchParams.get('from_route');

    const redirect = routeId ? `/route/${routeId}/1` : ' ';

    const onSuccess = () => {
        notify(`ra.notification.created`);
        redirectTo(redirect);
    }

    const transform = (data: any) => {
        // Initialize workDays as a string of 7 zeros
        let workDays = "0000000";
    
        // Generate today's date in UTC format
        const utcDate = new Date().toISOString().split("T")[0]; // Get the UTC date (YYYY-MM-DD)
    
        // Add the UTC date to start and end time
        const startDateTime = `${utcDate}T${data.startTime}Z`;
        const endDateTime = `${utcDate}T${data.endTime}Z`;
    
        // Modify the workDays string based on the input array
        if (Array.isArray(data.workDays)) {
            data.workDays.forEach((day: string) => {
                const index = parseInt(day) - 1; // Convert day to 0-based index
                if (index >= 0 && index < 7) {
                    workDays = workDays.substring(0, index) + "1" + workDays.substring(index + 1);
                }
            });
        }

        console.log(workDays);
    
        // Return the modified data
        return {
            ...data,
            startTime: startDateTime,
            endTime: endDateTime,
            workDays: workDays,
        };
    };
    

    return !isLoading && !identityLoading ?(
        <Create transform={transform} title={"resources.driverroute.create_title"} mutationOptions={{onSuccess}}>
            <SimpleForm defaultValues={{routeId}} toolbar={<ToolbarCreateForm listLink={redirect}  />}>
                <Box sx={{ width: '100%', display:{ xs: 'block', md: 'flex' }, flexWrap:{ xs: 'none', md:'wrap' } }}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display:{ s: 'block', md: 'flex' }, flexWrap:{ xs:'none', md:'wrap' } }}>
                            <Box flex={1} mr={{ s:0, md: '0.5em' }}>
                                <ReferenceInput 
                                label='Condutor' 
                                reference={permissions == '2' && identity && identity.entityId ? `entity/driver/entity/${identity.entityId}` : 'entity/driver'} 
                                source='userId' sort={{ field: 'username', order: 'ASC' }}
                                queryOptions={{
                                    refetchOnWindowFocus: false
                                }}
                                >
                                    <AutocompleteInput size='small' optionText={"username"} optionValue='userId' validate={required()} label="Condutor"/>
                                </ReferenceInput>
                            </Box>
                        </Box>
                        <Box sx={{ display:{ s: 'block', md: 'flex' }, flexWrap:{ xs:'none', md:'wrap' } }}>
                            <Box mr={{ s:0, md: '0.5em' }}>
                                <SimpleTimeInput validate={required()} source='startTime' label="Início"/>
                            </Box>
                            <Box ml={{ s:0, md: '0.5em' }}>
                                <SimpleTimeInput validate={required()} source='endTime' label="Fim"/>
                            </Box>
                        </Box>
                        <Box>
                            <CheckboxGroupInput validate={required()}  source="workDays" label="Dias de trabalho" choices={[
                                { id: '1', name: 'Seg' },
                                { id: '2', name: 'Ter' },
                                { id: '3', name: 'Quar' },
                                { id: '4', name: 'Qui' },
                                { id: '5', name: 'Sex' },
                                { id: '6', name: 'Sab' },
                                { id: '7', name: 'Dom' }
                            ]}/>
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    )
    :
    (
        <Loading/>
    )
}

export default DriverRouteCreate;