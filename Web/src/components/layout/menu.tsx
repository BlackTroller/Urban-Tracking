import { useRef, useState} from "react";
import { People,  
Security, 
Insights,
Store,
Route,
DepartureBoard,
GpsFixed,
AutoStories,
Business
} from '@mui/icons-material';
import {
  useTranslate,
  MenuItemLink,
  MenuProps,
  usePermissions,
  useSidebarState,
  useStore,
  useGetIdentity
} from "react-admin";
import SubMenu from "./submenu";
import { Box, Divider } from "@mui/material";
import { Link } from 'react-router-dom';
import { identity } from "lodash";

type MenuName = 'menuSeguranca' | 'menuConfig';

const MyMenu = ({ dense = false } : MenuProps) => {

  //Mudar logos
  const logoBigImg = useRef<string>('UB_H_RGB.svg');
  const logoSmallImg = useRef<string>('UB_V_RGB.svg');

  const translate = useTranslate();
  const {permissions, isLoading} = usePermissions();
  const { identity : profile, isLoading : isLoadingProfile } = useGetIdentity();
  const [resource] = useStore('resource.name');
  const [open] = useSidebarState();

  const [state, setState] = useState({
    menuSeguranca: resource==='menuSeguranca' ? true : false,
    menuConfig: resource==='menuConfig' ? true : false
  });


  const handleToggle = (menu: MenuName) => {
    setState(state => ({...state, [menu]: !state[menu]}));
  };
  
    return !isLoading && !isLoadingProfile ? (
      <Box sx={{
        width: theme => open ? theme.sidebar.width : theme.sidebar.closedWidth,
        marginTop: 1,
        marginBottom: 1,
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        }}
      >
      <Box sx={{padding: '10px 0px 10px 0px'}}>
        <Link to={"/"}>
          {open ? 
          <Box sx={{width: '220px', padding: '0px 13px 0px 13px'}}>
              {logoBigImg.current ? <img src={logoBigImg.current} alt="logo" style={{maxWidth: '220px'}}/> : <></>}
          </Box> 
          : 
          <Box sx={{maxWidth: '80px', display: 'flex', justifyContent: 'center'}}>
              {logoSmallImg.current ? <img src={logoSmallImg.current} alt="logo" style={{width: '100%', height: '100%', marginLeft: '6px'}}/> : <></>}
          </Box>
          }
        </Link>
      </Box>
      <MenuItemLink 
      to={{ pathname: "/dashboard" }}
      className={"sidebar " + (open ? 'open' : 'close')}
      primaryText={translate(`ra.page.dashboard`)}
      sx={{ color: theme => !open ? theme.sidebar.background : 'default' }}
      leftIcon={<Insights />}
      dense={dense}
      placeholder={undefined}
      />
      {(permissions=='3') && 
      <MenuItemLink
      to={{ pathname: "/entity" }}
      className={"sidebar " + (open ? 'open' : 'close')}
      primaryText={translate(`resources.menu.entity`)}
      sx={{ color: !open ? 'transparent' : 'default' }}
      leftIcon={<Store />}
      dense={dense} 
      placeholder={undefined} 
      />
      }
      {(permissions == '2' && profile) && 
        <MenuItemLink
        to={{ pathname: `/entity/${profile.entityId}` }}
        className={"sidebar " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.myentity`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<Business />}
        dense={dense} 
        placeholder={undefined} 
        />
      }
      {(permissions=='3' || permissions == '2') && 
        <MenuItemLink
        to={{ pathname: "/route" }}
        className={"sidebar " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.route`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<Route />}
        dense={dense} 
        placeholder={undefined} 
        />
      }
      {(permissions == '3' || permissions == '2') && 
        <MenuItemLink
        to={{ pathname: "/stop" }}
        className={"sidebar " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.stop`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<DepartureBoard />}
        dense={dense} 
        placeholder={undefined} 
        />
      }
      {(permissions== '3' || permissions=="2") && 
        <MenuItemLink
        to={{ pathname: "/region" }}
        className={"sidebar " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.region`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<GpsFixed />}
        dense={dense} 
        placeholder={undefined} 
        />
      }
      {(permissions == '2') && 
        <MenuItemLink
        to={{ pathname: "/user" }}
        className={"sidebar " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.driver`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<People />}
        dense={dense} 
        placeholder={undefined} 
        />
      }
      {/* {(permissions == '3') && <Divider/>}
      {(permissions == '3') &&  
      <SubMenu
        handleToggle={() => handleToggle("menuConfig")}
        isOpen={state.menuConfig}
        name='pos.menu.config'
        icon={<DisplaySettings />}
        dense={dense}
      >
        <MenuItemLink
        to={{ pathname: "/submenu1-escolha1" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate('Configuração 1')}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<MapsHomeWork />}
        dense={dense} 
        placeholder={undefined} 
        />
        <MenuItemLink
        to={{ pathname: "/submenu1-escolha2" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate('Configuração 2')}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<Handyman />}
        dense={dense}
        placeholder={undefined} 
        />
        <MenuItemLink
        to={{ pathname: "/submenu1-escolha3" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate('Configuração 3')}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<Category />}
        dense={dense} 
        placeholder={undefined} 
        />
        {permissions == '3' && 
        <MenuItemLink
        to={{ pathname: "/submenu1-escolha4" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate('Configuração 4')}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<Flaky />}
        dense={dense} 
        placeholder={undefined} 
        />
        }
        {permissions == '3' && 
        <MenuItemLink
        to={{ pathname: "/submenu1-escolha5" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate('Configuração 5')}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<AccountTreeOutlined />}
        dense={dense} 
        placeholder={undefined} 
        />
        }
      </SubMenu>
      } */}
      {(permissions =='3') && <Divider/>}
      {(permissions == '3') && 
      <SubMenu
        handleToggle={() => handleToggle("menuSeguranca")}
        isOpen={state.menuSeguranca}
        name='pos.menu.seguranca'
        icon={<Security />}
        dense={dense}
      >
        <MenuItemLink
        to={{ pathname: "/user" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.utilizadores.name`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<People />}
        dense={dense} 
        placeholder={undefined} 
        />
        <MenuItemLink
        to={{ pathname: "/audit" }}
        className={"submenuItem " + (open ? 'open' : 'close')}
        primaryText={translate(`resources.menu.audit`)}
        sx={{ color: !open ? 'transparent' : 'default' }}
        leftIcon={<AutoStories />}
        dense={dense} 
        placeholder={undefined} 
        />
      </SubMenu>
      }
    </Box>
  ) : null;
};

export default MyMenu;