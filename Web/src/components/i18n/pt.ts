import { TranslationMessages } from "react-admin";

const portugueseMessages : TranslationMessages = {
    ra: {
        action: {
            add_filter: "Filtrar",
            add: "Adicionar",
            back: "Voltar",
            bulk_actions: "1 item selecionado |||| %{smart_count} items selecionados",
            cancel: "Cancelar",
            clear_input_value: "Limpar campo",
            clear_array_input: 'Limpar campos',
            clone: "Duplicar",
            confirm: "Confirmar",
            create: "Criar",
            create_item: 'Créer %{item}',
            delete: "Eliminar",
            edit: "Alterar",
            export: "Exportar",
            list: "Listar",
            refresh: "Atualizar",
            remove_filter: "Remover filtro",
            remove: "Remover",
            save: "Guardar",
            select_all: 'Selecionar tudo',
            select_row: 'Selecione esta linha',
            search: "Procurar",
            show: "Ver",
            sort: "Ordenar",
            undo: "Desfazer",
            unselect: 'Desmarcar',
            expand: 'Expandir',
            close: 'Fechar',
            open_menu: 'Abrir Menu',
            close_menu: 'Fechar Menu',
            update: 'Editar',
            move_up: 'Subir',
            move_down: 'Descer',
            open: 'Abrir',
            toggle_theme: 'Tema claro/escuro',
            associate_entity: 'Associar Entidade',
            copy: 'Cópia',
            remove_all_filters: 'Remover todos os filtros',
            invert: 'Inverter',
            select_columns: 'Selecionar colunas',
            update_application: ""
        },
        sort: {
            sort_by: 'Ordenar por %{field} %{order}',
            ASC: 'Ascendente',
            DESC: 'Descendente',
        },
        boolean: {
            true: "Sim",
            false: "Não",
            null: ' ',
        },
        page: {
            create: "Criar %{name}",
            dashboard: "Painel de controlo",
            edit: "%{name} #%{id}",
            error: "Ocurreu um erro",
            list: "%{name}",
            loading: "A carregar",
            not_found: "Não encontrado",
            unauthorized: 'Não autorizado',
            show: "%{name} #%{id}",
            empty: 'LISTA SEM REGISTOS',
            empty_create: 'Clique aqui para criar um novo registo',
            invite: 'Deseja adicionar um?',
            configuration: 'Configuração',
            profile: 'Perfil'
        },
        input: {
            file: {
                upload_several:
                "Arraste os ficheiros para fazer o upload ou clique para selecionar.",
                upload_single:
                "Arraste o ficheiro para fazer o upload ou clique para selecionar."
            },
            image: {
                upload_several:
                "Arraste as imagens para fazer o upload ou clique para selecionar.",
                upload_single:
                "Arraste a imagem para fazer o upload ou clique para selecionar."
            },
            references: {
                all_missing: "Não foi possível encontrar os dados das referências.",
                many_missing: "Pelo menos uma das referências não está disponível.",
                single_missing: "A referência não está disponível."
            },
            password: {
                toggle_visible: 'Esconder a senha',
                toggle_hidden: 'Mostrar senha',
            },
        },
        message: {
            about: "Sobre",
            are_you_sure: "Tem a certeza?",
            auth_error: 'Erro na autenticação',
            bulk_delete_content:"Tem acerteza que deseja apagar %{name}? |||| Tem acerteza que deseja apagar estes %{smart_count} itens?",
            bulk_delete_title: "Apagar %{name} |||| Apagar %{smart_count} %{name}",
            bulk_update_content:'Tem acerteza que deseja editar este item ? |||| Tem acerteza que deseja editar estes %{smart_count} itens ?',
            bulk_update_title:'Editar %{name} |||| Editar %{smart_count} %{name}',
            clear_array_input: 'Deseja eliminar todos os items?',
            delete_content: "Tem a certeza que deseja apagar este item?",
            delete_title: "Apagar item",
            details: "Detalhes",
            error:"Ocorreu um erro no cliente. Não foi possível finalizar o seu pedido.",
            invalid_form: "O formulário apresenta erros.",
            loading: "A carregar. Um momento por favor.",
            unauthorized: 'Não tem autorização a este recurso',
            no: "Nao",
            not_found: "Página não encontrada.",
            yes: "Sim",
            unsaved_changes:"Algumas alterações não foram salvas. Tem acerteza que deseja sair desta página ?",
            ondroprejected: 'Imagem inválida. Tamanho máximo de 5MB'
        },
        navigation: {
            no_results: "Nenhum resultado encontrado.",
            no_more_results:"A página %{page} está fora dos limites. Tente a página anterior.",
            page_out_of_boundaries: "Página %{page} fora do limite",
            page_out_from_end: "Não é possível ir para depois da última página",
            page_out_from_begin: "Não é possível ir para antes da primeira página",
            page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
            partial_page_range_info:'%{offsetBegin}-%{offsetEnd} em mais de %{offsetEnd}',
            page_rows_per_page: "Resultados por página:",
            current_page: 'Página %{page}',
            page: 'Ir para a página %{page}',
            first: 'Ir para a primeira página',
            last: 'Ir para a última página',
            next: "Próximo",
            previous: "Anterior",
            skip_nav: 'Ir para o conteúdo',
        },
        auth: {
            auth_check_error: 'Por favor faça o login para continuar',
            user_menu: "Perfil",
            username: "Utilizador",
            password: "Senha",
            sign_in: "Entrar",
            sign_in_error: "Erro na autenticação. Por favor volte a tentar.",
            logout: "Sair",
            remember_me: 'Lembrar-se de mim',
            forgot: 'Recuperar senha',
            insert_code: 'Inserir Código',
            alter_password: 'Nova Senha'
        },
        notification: {
            updated: "Item atualizado",
            updated_error: "Erro a atualizar item",
            created: "Item criado",
            deleted: "Item apagado |||| %{smart_count} items apagados",
            deleted_error: "Erro a eliminar item",
            bad_item: "Item incorreto",
            item_doesnt_exist: "Elemento inesxistente",
            http_error: "Server communication error",
            data_provider_error: "Erro no dataprovider,",
            i18n_error: 'Não foi possível carregar traduções para o idioma especificado',
            canceled: "Ação cancelada",
            logged_out: "A sua sessão terminou. Por favor reconecte-se",
            not_authorized: "Você não está autorizado a aceder a este recurso.",
            copy: 'Item copiado',
            copy_error: 'Erro a copiar item',
            application_update_available: ""
        },
        validation: {
          required: "Obrigatório",
          minLength: "Deve ter no mínimo %{min} caracteres",
          maxLength: "Deve ter no máximo %{max} caracteres",
          minValue: "Deve ser %{min} ou maior",
          maxValue: "Deve ser %{max} ou menor",
          number: "Deve ser um número",
          email: "Deve ser um email válido",
          oneOf: "Deve ser uma das seguintes opções: %{options}",
          regex: "Deve ter o formato específico (regexp): %{pattern}",
          invalid: 'Valor inválido'
        },
        saved_queries: {
            label: 'Minhas solicitações',
            query_name: 'Nome da consulta',
            new_label: 'Adicionar aos meus pedidos...',
            new_dialog_title: 'Adicionar a consulta atual às minhas consultas',
            remove_label: 'Remover dos meus pedidos',
            remove_label_with_name: 'Remover "%{name}" das minhas solicitações',
            remove_dialog_title: 'Excluir das minhas consultas?',
            remove_message:'Tem certeza de que deseja remover esta consulta da sua lista de consultas?',
            help: 'Filtre a lista e adicione esta consulta à sua lista',
        },
    },
    pos: {
        labels: {
            search: 'Procurar por nome',
            searchTitle: 'Procurar por titulo'
        },
        menu:{
            config: 'Configuração',
            seguranca: 'Segurança',
            language: 'Idioma'
        },
        language: 'Idioma',
    },
    resources: {
        'app-users-sessions': {
            name: 'Sessões',
            // edit_title: 'Editar Sessão',
            // create_title: 'Criar Sessão',
            fields: {
                app_id: 'Aplicação',
                validity: 'Validade'
            }
        },
        utilizadores:{
            name: "Utilizadores",
            edit_title: 'Editar Utilizador',
            create_title: "Criar Utilizador",
            tabs: {
                prefs_util: 'Preferências'
            },
            fields: {
                nome: 'Nome',
                morada: 'Morada',
                nif: 'Nº de Idenficação Fiscal',
                nic: 'Nº de Idenficação Civil',
                cc: 'Cartão de Cidadão',
                telefone: 'Telefone',
                telemovel: 'Telémovel',
                email: 'Email',
                password: 'Senha',
                foto: 'Imagem',
                ativo: 'Ativo',
                ult_acesso: 'Último acesso',
                // entidade: 'Entidade',
                roles: 'Perfis',
                username: 'Utilizador',
                confirm_password: 'Confirmar senha',
                cod_postal: 'Código postal',
                validation_date: 'Data de Validação',
                tema_fav: 'Tema',
                lang_fav: 'Idioma',
                use_email: 'Usar email?',
                createdAt: 'Criado em',
            },
            field_validation: {
                password: 'A passsword deve conter 6 caracteres, sendo pelo menos um deles um número',
                email: "Não pode conter os seguintes caracteres: !#$%&'*+/?^`{|}()~",
                name: 'Apenas letras e o seguintes caracteres: _-.',
                telefone: 'Precisa ser um número de telefone válido: 00000000',
                telemovel: 'Precisa ser um número de telémovel válido: 00000000',
                nif: 'Precisa ser um nº de idenficação fiscal válido: 00000000',
                nic: 'Precisa ser um nº de idenficação comercial válido: 00000000',
                cc: 'Precisa ser um cartão de cidadão válido: 0000000000 (10)',
                username: 'Só pode conter letras e os seguintes caracteres: _',
                cod_postal: 'Apenas números e os seguintes caracteres: -.@[]-',
            }
        },
        role:{
            name: "Perfis",
            edit_title: 'Editar Perfil',
            create_title: "Criar Perfil",
            fields: {
                nome: 'Descrição',
            }
        },
        region:{
            name: "Regiões",
            edit_title: 'Editar Região',
            create_title: "Criar Região",
            fields: {
                nome: 'Nome',
            }
        },
        entity:{
            name: "Entidades",
            edit_title: 'Editar Entidade',
            create_title: "Criar Entidade",
            single: "Entidade",
            drivers: "Condutores",
            fields: {
                nome: 'Nome',
                email: 'Email',
                phone: 'Telefone',
                active: 'Ativo',
                logo: 'Logo',
                about: 'Sobre',
                workHours: 'Horário de Trabalho',
                regionName: 'Região',
            },
            field_validation: {
                name: 'Apenas letras e os seguintes caracteres: _-.',
                email: 'Email inválido',
                phone: 'Telefone inválido',
                about: 'Texto inválido',
                about_invalid_characters: 'Texto inválido',
                about_length: 'Texto deve ter entre 10 e 300 caracteres',
                workHours_invalid_format: 'Deve conter apenas dígitos e pode ter espaços, hífens ou parênteses opcionais',
            }
        },
        menu:{
            region: 'Regiões',
            entity: 'Entidades',
            audit: 'Auditoria',
            route: 'Rotas',
            stop: 'Paragens',
            driver: 'Condutores',
            myentity: 'Minha Entidade'
        },
        route:{
            name: "Rotas",
            edit_title: 'Editar Rota',
            create_title: "Criar Rota",
            single: "Rota",
            driverroute: "Rotas de trabalho",
            fields: {
                nome: 'Nome',
                region: 'Região',
                entity: 'Entidade',
                ativo: 'Ativo',
                stops: 'Paragens',
                button_label_open: 'Gestão de Paragens',
                button_label_close: 'Fechar',
                button_label_add: 'Adicionar Paragem',
            },
        },
        stop:{
            name: "Paragens",
            edit_title: 'Editar Paragem',
            create_title: "Criar Paragem",
            fields:{
                nome: 'Nome',
                latitude: 'Latitude',
                longitude: 'Longitude'
            }
        },
        audit:{
            name: "Auditoria",
            fields:{
                nome: 'Nome',
                resource: 'Recurso',
                resourceId: 'Id Recurso',
                action: 'Ação',
                logDate: 'Data'
            }
        }
    },
}

export default portugueseMessages;