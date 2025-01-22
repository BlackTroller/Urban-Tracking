import { useState, useEffect } from "react";
import {
    Create, 
    SimpleForm, 
    TextInput, 
    required, 
    SelectInput,
    useDataProvider 
} from "react-admin";
import ToolbarCreateForm from "../../components/general/ToolbarCreateForm";
import validateEntitiesCreateForm from "./validators/EntitiesCreateValidation";
import { Box } from '@mui/material';

export const EntitiesCreate = () => {
    const [regions, setRegions] = useState<any[]>([]); // Estado para armazenar regiões
    const dataProvider = useDataProvider(); // Acesso ao dataProvider 

    // Função para buscar regiões com o dataProvider
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const { data } = await dataProvider.getList("region", {
                    pagination: { page: 1, perPage: 100 },
                    sort: { field: "name", order: "ASC" },
                    filter: {},
                });
                setRegions(data); // Atualiza o estado com as regiões recebidas
            } catch (error) {
                console.error("Erro ao buscar regiões:", error);
            }
        };

        fetchRegions();
    }, [dataProvider]);

    // Transform para ajustar o payload antes de enviar
    const transform = (data: any) => {
        //console.log(data);
        return {
            ...data,
        };

    };

    return (
        <Create transform={transform} title="resources.entity.create_title">
            <SimpleForm
                defaultValues={{ active: true }}
                validate={(values) => validateEntitiesCreateForm(values, true)}
                toolbar={<ToolbarCreateForm />}
            >
                <Box
                    width={'100%'}
                    display={{ s: 'block', md: 'flex' }}
                    sx={{ flexWrap: { xs: 'none', md: 'wrap' } }}
                >
                    <Box width={'100%'}>
                        <Box>
                            <Box sx={{ display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box flex={1}>
                                    <TextInput
                                        fullWidth
                                        source="name"
                                        inputProps={{ minLength: 3 }}
                                        autoComplete="off"
                                        label="resources.entity.fields.nome"
                                        validate={required()}
                                    />
                                </Box>
                                <Box flex={1}>
                                    <TextInput
                                        fullWidth
                                        source="email"
                                        label="resources.entity.fields.email"
                                        validate={required()}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box flex={1}>
                                    <TextInput
                                        fullWidth
                                        source="phone"
                                        label="resources.entity.fields.phone"
                                        validate={required()}
                                    />
                                </Box>
                                <Box flex={1}>
                                    <TextInput
                                        fullWidth
                                        source="about"
                                        label="resources.entity.fields.about"
                                        validate={required()}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: { xs: '5px', md: '18px' }, flexDirection: { xs: 'column', md: 'row' } }}>
                                <Box flex={1}>
                                    <TextInput
                                        fullWidth
                                        source="workHours"
                                        label="resources.entity.fields.workHours"
                                        validate={required()}
                                    />
                                </Box>
                            </Box>
                            <Box mt={1}>
                                <SelectInput
                                    source="regionId"
                                    choices={regions.map((region) => ({
                                        id: region.id,
                                        name: region.name,
                                    }))}
                                    label="resources.entity.fields.regionName"
                                    validate={required()}
                                    fullWidth
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    );
};
