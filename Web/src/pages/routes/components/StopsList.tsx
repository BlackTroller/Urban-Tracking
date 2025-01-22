import { List, Datagrid, usePermissions, Loading, WithRecord, useDataProvider, useTranslate, TopToolbar, ReferenceField, TextField, useListContext, Form, AutocompleteInput, useGetList, SaveButton, useRecordContext } from "react-admin";
import { RoutesFilters } from "./../RoutesFilter";
import { Box, Typography, Dialog, DialogContentText, DialogContent, Button } from '@mui/material';
import CustomEmptyPage from "../../../components/general/CustomEmptyPage";
import { Routes, Stop } from "../../../utils/types";
import CustomPagination, { perPageDefault } from "../../../components/general/CustomPagination";
import { Delete, Add } from '@mui/icons-material';
import { commonListCSS } from "../../../components/general/CustomButtonToolTip";
import CustomConfirmButtonToolTip from "../../../components/general/CustomConfirmButtonToolTip";
import { responsiveListFilter } from "../../../components/general/customCSS";
import { useState,useRef } from "react";

const ListActions = ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    
    const translate = useTranslate();
    // Função para abrir o diálogo
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <TopToolbar>
            <Button variant="outlined" onClick={handleOpen}>
                <Add/>
                <Typography sx={{ fontSize: "15px" }}>{translate('resources.route.fields.button_label_add')}</Typography>
            </Button>
        </TopToolbar>
    )
} 

const CreateWithModal = ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    
    const translate = useTranslate();
    // Função para abrir o diálogo
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Button variant="contained" onClick={handleOpen}>
            <Typography>{translate('ABRIR BUTAO')}</Typography>
        </Button>
    )
} 

const Aside = ({ isOpen, setOpen, routeId }: { isOpen: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>, routeId: string }) => {
    const dataProvider = useDataProvider();
    const { refetch } = useListContext();
    const [regionValue, setRegionValue] = useState<string | null>(null);
    const inputTimeoutRef = useRef<number | undefined>(undefined);

    // Obtenção de dados filtrados com base no valor digitado
    const { data, isLoading } = useGetList("stop", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "name", order: "ASC" },
        filter: regionValue ? { name: regionValue } : {},
    });

    // Gerenciamento do debounce
    const handleInputChange = (value: string): void => {
        if (inputTimeoutRef.current) {
            clearTimeout(inputTimeoutRef.current);
        }

        inputTimeoutRef.current = window.setTimeout(() => {
            setRegionValue(value); // Atualiza o valor após o debounce
            console.log("Input value after debounce:", value);
        }, 400); // Timeout de 700ms
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data: any) => {
         // Criação do objeto com o routeId e stopId
         const body = {
            routeId: routeId, // routeId recebido como prop
            stopId: data.stopId, // O valor de stopId que vem do form
        };

        try {
            // Envio da requisição para criar ou atualizar a associação
            await dataProvider.create("routeStop/add-to-route", { data: body });
            // Após o envio, refaz a consulta para atualizar a lista
            refetch();
            // Fecha o modal após o sucesso
            handleClose();
        } catch (error) {
            console.error("Erro ao salvar a associação:", error);
        }
        
    };

    return (
        <Dialog open={isOpen} fullWidth maxWidth="sm">
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    background: (theme) => (theme.palette.mode === "dark" ? "#161c24" : "#fff"),
                }}
            >
                <DialogContentText fontSize="1.5rem">Paragens</DialogContentText>
                <Box display="flex" sx={{ flexWrap: "nowrap", width: "100%" }}>
                    <Form onSubmit={onSubmit} id="modal_stop">
                        <AutocompleteInput
                            source="stopId"
                            choices={data || []}
                            optionText="name"
                            optionValue="id"
                            isLoading={isLoading}
                            onInputChange={(event, value) => handleInputChange(value || "")} // Passa o valor corretamente
                        />
                        <SaveButton form="modal_stop" />
                    </Form>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        sx={{ marginLeft: "auto", marginTop: "auto" }}
                    >
                        <Typography variant="body1">Fechar</Typography>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export const StopsList = () => {
    
    const {permissions, isLoading} = usePermissions();
    const record = useRecordContext<Routes>();
    const [isOpen, setOpen] = useState<boolean>(false);
    //const dataProvider = useDataProvider();

    return !isLoading && record ? (
    <>
    <List  
    queryOptions={{ 
        refetchOnWindowFocus: false
    }} 
    pagination={<CustomPagination/>} 
    perPage={perPageDefault} 
    filters={RoutesFilters(permissions)} 
    empty={<CustomEmptyPage create={true} createButtonProp={<CreateWithModal setOpen={setOpen}/>}/>}
    actions={<ListActions setOpen={setOpen} />}
    aside={<Aside isOpen={isOpen} setOpen={setOpen} routeId={record.id}/>}
    title=" "
    resource={"routeStop/by-route/" + record.id}
    sx={{paddingLeft: '10px', ...responsiveListFilter}}
    >
        <Datagrid bulkActionButtons={false}>
                <TextField source="stopName" label="name"/>
            
            <Box sx={{gap: '4px', float: 'right'}}>
                <WithRecord render={(record : Stop) => {
                    return( 
                        <>
                            <CustomConfirmButtonToolTip 
                            sx={commonListCSS}
                            label={"ra.action.delete"}
                            color="error"
                            icon={<Delete />} 
                            id={record.id} 
                            resource={"routeStop"}
                            />
                        </>
                    )
                    }}
                />
            </Box>
        </Datagrid>
    </List>
</>) : <Loading/>;
};


