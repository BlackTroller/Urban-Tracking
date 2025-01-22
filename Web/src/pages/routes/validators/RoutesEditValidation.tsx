const validateRoutesEditForm = (values: any) => {
    const errors = {};
  
    if (!values.name || (values.name && values.name.trim().length === 0)) {
      //inves de passar mensagens podeomos passar identificadores para o i8onprovider
      //@ts-ignore
      errors.name = "ra.validation.required";
    }
    //notar que ele aceita espaços
    /* else if(values.name && values.name.trim().length!==0 && !/^\S*[A-Za-zÀ-ÿ ._-]{2,}$/.test(values.name)){
          //@ts-ignore
          errors.name = 'resources.region.field_validation.name'
      } */
  
    return errors;
  };

export default validateRoutesEditForm;