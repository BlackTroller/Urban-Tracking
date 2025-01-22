import './App.css';
import lb4Provider from './utils/data-provider';
import { Admin, CustomRoutes, fetchUtils, Resource } from 'react-admin';
import MyLayout from './components/layout';
import { roles } from './pages/roles';
import { users } from './pages/users';
import { regions } from './pages/regions';
import { entities } from './pages/entities';
import { routes } from './pages/routes';
import { authProvider } from './utils/authProvider';
import { stops } from './pages/Stops';
import { audits } from './pages/audits';
import SignIn from './components/layout/login';
import { i18nProvider } from './components/i18n';
import { Route } from 'react-router-dom';
import Configuration from './pages/configuration/Configuration';
import themes from './components/layout/themes';
import Profile from './pages/configuration/Profile';
import { Unauthorized } from './components/general/Unauthorized';
import Dashboard from './pages/dashboard';
import { driverRoute } from './pages/driverRoute';

const httpClient = (url : string, options = {}) => {

  //@ts-ignore
  options.headers = new Headers({ Accept: "application/json", Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}` });

  return fetchUtils.fetchJson(url, options);
};

const aggregate = (resource : any) => {

   switch(resource){
     
     default:
       break;
   }

  return [];
};

export let url = import.meta.env.VITE_REST_API ?  import.meta.env.VITE_REST_API : 'http://localhost:5128';

const dataProvider = lb4Provider(url, aggregate, httpClient);


const App = () => {

  return (

    <Admin 
    lightTheme={themes['light']}
    darkTheme={themes['dark']}
    defaultTheme='dark'
    layout={MyLayout} 
    authProvider={authProvider} 
    loginPage={SignIn} 
    dataProvider={dataProvider}
    i18nProvider={i18nProvider} 
    disableTelemetry
    requireAuth
    >  
        {(permission : string) => {
          return [
            <Resource name="user" {...users(permission)}/>,
            <Resource name="roles" {...roles(permission)}/>,
            <Resource name="region" {...regions(permission)}/>,
            <Resource name="entity" {...entities(permission)}/>,
            <Resource name="route" {...routes(permission)}/>,
            <Resource name="stop" {...stops(permission)}/>,
            <Resource name="audit" {...audits(permission)}/>,
            <Resource name="driverRoute" {...driverRoute(permission)}/>,
            <CustomRoutes>
              <Route  path="/dashboard" element={<Dashboard />} />
              <Route  path="/configuration" element={<Configuration />} />
              <Route  path="/profile" element={<Profile />} />
              <Route path="/unauthorized" key={"/unauthorized"}  element={<Unauthorized/>}/>
            </CustomRoutes>
          ]
        }}
    </Admin>
    
  ) ;
}

export default App;
