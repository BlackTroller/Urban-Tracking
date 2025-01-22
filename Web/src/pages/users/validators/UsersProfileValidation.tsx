const validateUsersProfileForm = (values : any) => {

    const errors = {};

    if (!values.name || (values.name && values.name.trim().length===0)) {
        //inves de passar mensagens podeomos passar identificadores para o i8onprovider
        //@ts-ignore
        errors.name = 'ra.validation.required'
    }
    //notar que ele aceita espaços
    /* else if(values.name && values.name.trim().length!==0 && !/^\S*[A-Za-zÀ-ÿ ._-]{2,}$/.test(values.name)){
        //@ts-ignore
        errors.name = 'resources.utilizadores.field_validation.name'
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
        errors.email = 'resources.utilizadores.field_validation.email'
    }
    */
    else if(values.email && values.email.trim().length!==0 && /\s/.test(values.email)){
        //@ts-ignore
        errors.email = 'resources.utilizadores.field_validation.email'
    }

    if (values.password && values.password.trim().length===0) {
        //@ts-ignore
        errors.password = 'resources.utilizadores.field_validation.password'
    } 
    //minimo 6 caracateres, contendo pelo menos um numero
    else if(values.password && values.password.trim().length!==0 && /\s/.test(values.password)){
        //@ts-ignore
        errors.password = 'resources.utilizadores.field_validation.password'
    }
    return errors;
}

export default validateUsersProfileForm;