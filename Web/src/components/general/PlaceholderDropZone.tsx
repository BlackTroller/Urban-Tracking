import { useTranslate } from "react-admin";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

const PlaceholderDropZone = () => {
    
    const translate = useTranslate();

    return(
    <Box sx={{
        height: '100%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Box sx={{display: 'flex', gap: '10px', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{height: 'max-content'}}>
                <Button 
                variant='contained' 
                /* sx={{
                    boxShadow: 'none',
                    '&:hover': {
                        background: theme=>theme.palette.primary.main,
                        boxShadow: 'none'
                    }
                }} */
                >
                    <Add/>
                </Button>
            </Box>
            <Box sx={{
                height: 'max-content'
            }}>
                <Typography sx={{fontSize: '20px', textAlign: 'center'}}>
                    {translate('Carregar imagem')}
                </Typography>
                <Typography sx={{fontSize: '12px', textAlign: 'center'}}>
                    {translate('(tamanho máximo 5MB)')}
                </Typography>
                <Typography sx={{fontSize: '10px', textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: '3px'}}>
                    {translate('ou clique para selecionar uma ')}
                </Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default PlaceholderDropZone;