import { CreateButton, useListContext, useResourceDefinition, useTranslate } from 'react-admin';
import { Box, Typography } from '@mui/material';
import EmptyImg from '../../assets/EmptyImg';
import { FC } from 'react';

type CustomEmptyPageProps = {
    create?: boolean;
    createButtonProp?: JSX.Element;
    otherButton?: JSX.Element;
};

const CustomEmptyPage: FC<CustomEmptyPageProps> = ({ create, createButtonProp, otherButton }) => {
    const { resource } = useListContext();
    const translate = useTranslate();
    const resourceDef = useResourceDefinition();

    const renderCreateButton = () => {

        if(otherButton) {
            return otherButton
        }

        if (create && createButtonProp != undefined) {
            return createButtonProp;
        }

        if (create || (create === undefined && resourceDef?.hasCreate)) {
            return <CreateButton variant="contained" />;
        }

        return null;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Box textAlign="center" m={1}>
                <EmptyImg />
                <Typography
                    variant="h4"
                    paragraph
                    color={(theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')}
                >
                    {translate('ra.page.empty', { name: resource })}
                </Typography>
                {renderCreateButton()}
            </Box>
        </Box>
    );
};

export default CustomEmptyPage;