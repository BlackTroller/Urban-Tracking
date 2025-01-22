const validateEntitiesEditForm = (values: any) => {

    const errors = {};

    if (!values.name || (values.name && values.name.trim().length === 0)) {
    //inves de passar mensagens podeomos passar identificadores para o i8onprovider
    //@ts-ignore
    errors.name = "ra.validation.required";
  }
  //notar que ele aceita espaços
  /* else if(values.name && values.name.trim().length!==0 && !/^\S*[A-Za-zÀ-ÿ0-9 ._-]{2,}$/.test(values.name)){
    //@ts-ignore
    errors.name = 'resources.region.field_validation.name'
    } */

  if(!values.email || (values.email && values.email.trim().length===0)){
    //@ts-ignore
    errors.email = 'ra.validation.required'
  }
  //deve conter pelo menos 2 caracteres antes e depois do @ e .
  //email valido: da@fa.pt
  /*
  else if(values.email && values.email.trim().length!==0 && !/^\S*(([a-zA-Z0-9\-.@_]*[a-zA-Z0-9]){1,})+@([a-z0-9-]{2,})+\.[a-z0-9]{2,}$/.test(values.email)){
      //@ts-ignore
      errors.email = 'resources.entity.field_validation.email'
  }
  */
  else if(values.email && values.email.trim().length!==0 && /\s/.test(values.email)){
      //@ts-ignore
      errors.email = 'resources.entity.field_validation.email'
  }

  if (!values.phone || (values.phone && values.phone.trim().length === 0)) {
    //@ts-ignore
    errors.phone = 'ra.validation.required';
  } 
  // Deve conter apenas dígitos e pode ter espaços, hífens ou parênteses opcionais
  // Exemplo de telefone válido: 912345678, (91)234-5678, +351912345678
  else if (
      values.phone && 
      values.phone.trim().length !== 0 && 
      !/^\+?[0-9\s\-().]{9,15}$/.test(values.phone)
  ) {
      //@ts-ignore
      errors.phone = 'resources.entity.field_validation.phone';
  }

  if (!values.about || (values.about && values.about.trim().length === 0)) {
    //@ts-ignore
    errors.about = 'ra.validation.required';
  }
  // Limitar o texto a caracteres válidos (apenas letras, números, espaços e pontuação básica)
  else if (
      values.about && 
      values.about.trim().length !== 0 && 
      !/^[a-zA-Z0-9\s.,!?()-]*$/.test(values.about)
  ) {
      //@ts-ignore
      errors.about = 'resources.entity.field_validation.about_invalid_characters';
  }
  // Validar limite mínimo e máximo de caracteres
  else if (values.about && (values.about.length < 10 || values.about.length > 300)) {
      //@ts-ignore
      errors.about = 'resources.entiity.field_validation.about_length';
  }

  if (!values.workHours || (values.workHours && values.workHours.trim().length === 0)) {
    //@ts-ignore
    errors.workHours = 'ra.validation.required';
  } 
  else if (values.workHours && !/^[a-zA-ZÀ-ÿ0-9\s,.'-]+$/.test(values.workHours)) {
    //@ts-ignore
    errors.workHours = 'resources.utilizadores.field_validation.workHours.invalid_format';
  }


    return errors;
  };
  
  export default validateEntitiesEditForm;