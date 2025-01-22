import { DataProvider, fetchUtils } from "ra-core";
import { stringify } from "query-string";
import { DataProviderWithCustomMethods } from "./types";

const clear = (data: object, previous?: any): any => {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        if (typeof value !== "object") {
          return [key, value];
        }

        if (Object.prototype.toString.call(value) === "[object Date]") {
          return [key, value.toISOString()];
        }
        
        if (Array.isArray(value)) {
          return [
            key,
            value
          ];
        } else {
          return [key, clear(value, (previous || {})[key])];
        }
      })
      .filter(
        ([_, value]) =>
          !(
            typeof value === "object" &&
            Object.entries(value).length <= 0
          )
      )
  );
};

//serve para formatar o param filter
const transformAttributes = (obj: any): any[] => {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return { [key]: transformAttributes(value) }; // Recursively transform nested objects
    }
    return { [key]: value };
  });
};


const lb4Provider = (
  apiUrl: string,
  aggregate = (resource: string) => [] as object[],
  httpClient = fetchUtils.fetchJson
): DataProviderWithCustomMethods => ({
  getEvery: async (resource : string, params : any) => {
    const aggregator = aggregate(resource);

    const query = stringify({
      where: JSON.stringify(transformAttributes(params.filter)),
      limit: params.limit ? params.limit : undefined,
      sort: !params.sort?.field || !params.sort?.order ? undefined : [`${params.sort.field} ${params.sort.order}`]
    });

    const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        "X-Total": "true",
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    let responseData = await result.json

    //const final = normalizeToId(result.json, resource);

    return {
      data: responseData,
    };
  },
  getList: async (resource, params) => {
    const aggregator = aggregate(resource);

    const query = stringify({
      where: JSON.stringify(transformAttributes(params.filter)),
      page: (params.pagination.page - 1) * params.pagination.perPage,
      limit: params.pagination.perPage,
      sort: [`${params.sort.field},${params.sort.order}`]
    });

    const result = await httpClient(params && params.meta && params.meta.id ? `${apiUrl}/${resource}/${params.meta.id}?${query}` : `${apiUrl}/${resource}?${query}`, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        "X-Count": "true",
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: result.json,
      total: parseInt(result.headers.get("X-Count") || "0"),
    };
  },
  getOne: async (resource, params) => {

    const aggregator = aggregate(resource);

    const query = stringify({
      filter: JSON.stringify({
        include: aggregator.length > 0 ? aggregator : params.meta && params.meta.include ? params.meta.include : undefined,
        fields: params.meta && params.meta.fields ? params.meta.fields : {}
      }),
    });

    const result = await httpClient(
      `${apiUrl}/${resource}/${params.id}?${query}`,
      {
        method: "GET",
        mode: 'cors',
        headers: new Headers({
          Accept: "application/json", 
          Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
        }),
      }
    );

    const data = result.json;

    return {
      data: data,
    };
  },
  getMany: async (resource, params) => {
    const aggregator = aggregate(resource);

    const query = stringify({
      where: JSON.stringify(params.ids.map(id => ({ id }))),
      // include: aggregator.length > 0 ? aggregator : params.meta && params.meta.include ? params.meta.include : undefined,
      // fields: params.meta && params.meta.fields ? params.meta.fields : {}
    });

    const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: result.json,
    };
  },
  getManyReference: async (resource, params) => {
    const aggregator = aggregate(resource);

    const query = stringify({
        where: JSON.stringify(transformAttributes({ ...params.filter, [params.target]: params.id })),
        page:
          (params.pagination.page - 1) * params.pagination.perPage,
        limit: params.pagination.perPage,
        sort: [`${params.sort.field},${params.sort.order}`],
        // include: aggregator.length > 0 ? aggregator : params.meta && params.meta.include ? params.meta.include : undefined,
        // fields: params.meta && params.meta.fields ? params.meta.fields : {}
    });

    const result = await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        "X-Count": "true",
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: result.json,
      total: parseInt(result.headers.get("x-count") || "0"),
    };
  },
  create: async (resource, params) => {

    if(params.data.photo && params.data.photo.rawFile && params.data.photo.rawFile.name){

      params.data.photo = {
        data : await verifyFile(params.data.photo),
        name : params.data.photo.rawFile.name
      };

    }

    const result = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(params.data),
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: result.json,
    };
  },
  update: async (resource, params) => {

    if(params.data.photo && params.data.photo.rawFile && params.data.photo.rawFile.name){
      //src é usado para verficar se a foto já existe ou não
      //no caso da a foto ser um blob:http:// é pq nao pertence
      params.data.photo = {
        data : await verifyFile(params.data.photo),
        name : params.data.photo.rawFile.name,
        src : params.data.photo.src
      };

    }

    const result = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      mode: 'cors',
      body: JSON.stringify(params.data),
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: params.previousData ? {
        ...params.previousData,
        ...params.data,
        ...result.json
      } : {
        ...params.data,
        ...result.json
      }
    };
  },
  updateMany: async (resource, params) => {
    const query = stringify({
      filter: JSON.stringify({
        where: {
          id: { inq: params.ids },
        },
      }),
    });

    await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      mode: "cors",
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: params.ids,
    };
  },
  delete: async (resource, params) => {
    
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      mode: "cors",
      body: params.meta && params.meta.data ? JSON.stringify(params.meta.data) : JSON.stringify({}),
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: params.previousData as any,
    };
  },
  deleteMany: async (resource, params) => {
    const query = stringify({
      filter: JSON.stringify({
        where: {
          id: { inq: params.ids },
        },
      }),
    });

    await httpClient(`${apiUrl}/${resource}?${query}`, {
      method: "DELETE",
      mode: 'cors',
      headers: new Headers({
        Accept: "application/json", 
        Authorization: `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
      }),
    });

    return {
      data: params.ids,
    };
  }
});

export default lb4Provider;

async function verifyFile(file : Object){

      //objeto Blob
      /*params.data.photo.rawFile = {
        path: params.data.photo.rawFile.path,
        lastModified: params.data.photo.rawFile.lastModified,
        lastModifiedDate: params.data.photo.rawFile.lastModifiedDate,
        name: params.data.photo.rawFile.name,
        size: params.data.photo.rawFile.size,
        type: params.data.photo.rawFile.type,
      }*/

    return new Promise((resolve, reject) => {

      const types = ['image/png', 'image/jpeg', 'image/jpg'];

      //@ts-ignore
      if(!types.includes(file.rawFile.type) || file.rawFile.size>5000000){
        reject(new DOMException("Problem parsing input file."));
      }

      let fileReader = new FileReader();

      //@ts-ignore
      fileReader.readAsDataURL(file.rawFile);

      fileReader.onloadend = function() {
        let base64Image : string | ArrayBuffer | null = this.result as string;
        let finalImage = base64Image.split(';base64,').pop();
        resolve(finalImage)
      };
      
      
    });

}
