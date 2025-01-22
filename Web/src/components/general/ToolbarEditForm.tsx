import { DeleteWithConfirmButton, ListButton, SaveButton, Toolbar } from "react-admin";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Box } from "@mui/material";

const ToolbarEditForm = ({listLink, deleteLink, hasDelete} : {listLink ?: string, deleteLink ?: string, hasDelete?: boolean}) => {

    return(
        <Toolbar sx={{justifyContent:'space-between'}}>
            <Box sx={{display:'flex', gap: '30px'}}>
                <SaveButton/>
                {listLink && listLink.trim().length>0 
                ? 
                <ListButton icon={<DoDisturbIcon/>} to={listLink} label={'ra.action.cancel'}/>
                :
                <ListButton icon={<DoDisturbIcon/>} label={'ra.action.cancel'}/>
                }
            </Box>
            {deleteLink && deleteLink.trim().length>0 
            ? 
            <DeleteWithConfirmButton redirect={deleteLink} label="ra.action.delete" confirmContent="ra.message.delete_content"/>
            :
            hasDelete || hasDelete===undefined
            ?
            <DeleteWithConfirmButton label="ra.action.delete" confirmContent="ra.message.delete_content"/>
            :
            <></>
            }
        </Toolbar>
    )
}

export default ToolbarEditForm;
