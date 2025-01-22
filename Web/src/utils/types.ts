import { DataProvider, RaRecord } from 'react-admin';

export type ThemeName = 'light' | 'dark';

type GetEveryParams = {
    filter: object,
    limit?: number,
    sort?: {
        order: string,
        field: string
    },
    meta?: object
}

type GetEveryResult<RecordType extends RaRecord = any> = {
    data: RecordType[];
    total?: number;
    pageInfo?: {
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
    };
}

// type NoParamsResult<RecordType extends RaRecord = any> = {
//     data: RecordType;
// }

export interface DataProviderWithCustomMethods extends DataProvider {
    /**
     * Em norma a função "create" do dataProvider espera que um id seja retornado com o registo criado, porém,
     * nem sempre esse é o caso, e nesses caso utilizamos este componente
     *  @remark neId - not expecting Id
     */
    getEvery:  <RecordType extends RaRecord = any> (resource: string, params?: GetEveryParams) => Promise<GetEveryResult<RecordType>>,
}

export type imageData = {
    data : string | undefined,
    path : string
}

export type fileTypes = {
    [key: string]: string
}

export type Identity = {
    id: string,
    name: string,
    avatar: string,
    entityId: string
}

export type jwtObject = {
    id: string,
    name: string,
    role: string,
    iat: number,
    exp: number,
    sub:string,
}

export interface Users extends RaRecord{
    id: string,
    name: string,
    password?:string | null,
    active?: boolean | null,
    createdAt?: string | null,
    role?: string
}

export interface DriverRoutes extends RaRecord{
    id: string,
    userId: string,
    routeId: string,
    startTime:string,
    endTime: string,
    workDays: string,
    username?: string // variavel que tem o nome do user desta route
}

export interface Roles extends RaRecord{
    id: string,
    description: string,
    app_id?: number
}

export interface Regions extends RaRecord{
    id: string,
    name: string,
}

export interface Entities extends RaRecord{
    id: string,
    name: string,
    email: string,
    phone: string,
    logo: string,
    active: boolean,
    about: string,
    workHours: string,
    regionId: string,
    regionName: string,
}

export interface Routes extends RaRecord{
    id: string,
    name: string,
    entityId: string,
    active: boolean,    
    regionId: string,
}

export interface Stops extends RaRecord{
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    active: boolean
}

export interface EntityDriver extends RaRecord{
    id: string,
    userId: string,
    entityId: string
    username?: string
}

export interface Stop extends RaRecord{
    id: string,
    routeId: string,
    stopId: string,
}

export interface Audits extends RaRecord{
    id: string,
    userId: string,
    resourceId: string,
    action: string,
    resource: string,
    logDate: string,
}