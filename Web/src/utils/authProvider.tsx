import decodeJwt from 'jwt-decode';
import { Entities, Users, jwtObject } from './types';

export const authProvider = {
    // authentication
    login: async ({ email , password } : any) => {

         const loginRequest = new Request(
             import.meta.env.VITE_REST_API + '/auth/login',
             {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                mode: 'cors',
                headers: new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' }),
             }
         );

         try {
            
            const loginResponse = await fetch(loginRequest);

            if (loginResponse.status < 200 || loginResponse.status >= 300) {
                return Promise.reject(loginResponse.statusText);
            }

            const auth = await loginResponse.json();
            localStorage.setItem('token', auth.token);

         return Promise.resolve();
            
            
        } catch {
            localStorage.removeItem('token');

            return Promise.reject();
        }

    },
    checkError: (error : any) => {

        const status = error.status;
        const token = localStorage.getItem('token');
        const profile = localStorage.getItem('profile');

        if (status === 401 || status === 403){
            if (error.body.error.message.includes('token is not valid') || error.body.error.message.includes('jwt expired')){

                localStorage.removeItem('token');
                localStorage.removeItem('profile');

                return Promise.reject({redirectTo: '/', logoutUser: true});
            }

            if(profile && token) return Promise.reject({redirectTo: '/unauthorized', logoutUser: false});
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();

    },
    checkAuth: async () => {

        const token = localStorage.getItem('token');
        
        if(!token) return Promise.reject({redirectTo: '/login'});

        return Promise.resolve();
        
    },
    logout: async () => {

        localStorage.removeItem('token');
        localStorage.removeItem('profile');

        return Promise.resolve();
    },
    getIdentity: async () => {

        const profilePreParse = localStorage.getItem('profile');
        const token = localStorage.getItem('token');
        const profile = profilePreParse ? JSON.parse(profilePreParse) : null;

        if ( (!profile || (profile && (!profile.fullName || !profile.id)) && token)){
            
             const request = new Request(
                import.meta.env.VITE_REST_API  +'/auth/me',
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: new Headers({ Accept: "application/json", Authorization: `Bearer ${token}` }),
                }
            );
            
            const response = await fetch(request);

            if (!response) {

                localStorage.removeItem('token');
                localStorage.removeItem('profile');
                
                Promise.reject({ redirectTo: '/login' });
            }
            

            const data : Users = await response.json();

            const newProfile = {
                id: data.id,
                fullName: data.name,
                avatar: '',
                entityId: ""
            }

            try{

                const requestEntity = new Request(
                    import.meta.env.VITE_REST_API  + `/entity/my-entity/${data.id}`,
                    {
                        method: 'GET',
                        mode: 'cors',
                        headers: new Headers({ Accept: "application/json", Authorization: `Bearer ${token}` }),
                    }
                );
    
                const responseEntity = await fetch(requestEntity);
    
                if (responseEntity) {
                    const data : Entities = await responseEntity.json();
                    newProfile.entityId = data.id;
                }

            }catch(error){
                console.log(error);
            }
            
            localStorage.setItem('profile', JSON.stringify(newProfile));

            try {
                return Promise.resolve(newProfile);
            } catch (error) {
                return Promise.reject(error);
            }

        } 

        return Promise.resolve(profile);

    },
    getPermissions: (params : any) => {

        const token = localStorage.getItem('token');

        if (!token) return Promise.resolve('guest');

        const decodedToken = decodeJwt<jwtObject | undefined>(token);

        if(!decodedToken || (decodedToken && !decodedToken.role)) return Promise.reject();

        const roles = decodedToken.role;

        return roles ? Promise.resolve(roles) : Promise.reject();
    }
};
