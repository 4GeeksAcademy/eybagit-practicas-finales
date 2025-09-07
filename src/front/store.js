export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
      ],
    // Estado global para Cliente + Tickets
    clientes: [],
    clienteDetail: null,
    tickets: [],
    ticketDetail: null,
    comentarios: [],
    api: { loading: false, error: null }
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      // API helpers
     case 'api_loading':
       return { ...store, api: { ...store.api, loading: action.payload } };
     case 'api_error':
       return { ...store, api: { loading: false, error: action.payload } };
 
     // Cliente
     case 'clientes_add':
       return { ...store, clientes: [...store.clientes, action.payload], api: { loading: false, error: null } };
     case 'clientes_upsert': {
       const c = action.payload;
       const exists = store.clientes.some(x => x.id === c.id);
       return {
         ...store,
         clientes: exists ? store.clientes.map(x => x.id === c.id ? c : x) : [...store.clientes, c],
         api: { loading: false, error: null }
       };
     }
     case 'clientes_remove':
       return { ...store, clientes: store.clientes.filter(x => x.id !== action.payload), api: { loading: false, error: null } };
     case 'cliente_set_detail':
       return { ...store, clienteDetail: action.payload, api: { loading: false, error: null } };
     case 'cliente_clear_detail':
       return { ...store, clienteDetail: null, api: { loading: false, error: null } };
 
     // Tickets
     case 'tickets_set_list':
       return { ...store, tickets: action.payload, api: { loading: false, error: null } };
     case 'tickets_add':
       return { ...store, tickets: [...store.tickets, action.payload], api: { loading: false, error: null } };
    
      // Diff para get clientes
           case 'clientes_set_list':
          return { ...store, clientes: action.payload, api: { loading: false, error: null } };

    
       case 'tickets_upsert': {
       const t = action.payload;
       const exists = store.tickets.some(x => x.id === t.id);
       return {
         ...store,
         tickets: exists ? store.tickets.map(x => x.id === t.id ? t : x) : [...store.tickets, t],
         api: { loading: false, error: null }
       };
     }
     case 'ticket_set_detail':
       return { ...store, ticketDetail: action.payload, api: { loading: false, error: null } };

    // Comentarios
    case 'comentarios_add':
      return { ...store, comentarios: [action.payload, ...store.comentarios], api: { loading: false, error: null } };


    default:
      throw Error('Unknown action.');
  }    
}
