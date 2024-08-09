import { MessageBase } from '@/types/messages';
import { create } from 'zustand'

interface WebSocketInterface {
    socket: WebSocket|undefined,
    url: string,
    access_token: string,
    id: number,
    init: (url: string, access_token: string) => void,
    connect: () => void,
    sendMessage: (message: MessageBase, callback: (event: MessageEvent<any>)=>void)  => number,
    messageHandler: (event: MessageEvent<any>) => void,

    //messageHandlers: Set<(event: MessageEvent<any>) => void>,
    //id: number,
    //connect: (ha_url: string, access_token: string) => void,
    //sendMessage: (message: MessageBase) => number,
    //subscribe: (handler: (event: MessageEvent<any>) => void) => void,
    //unsubscribe: () => void,
}

function connected(socket: WebSocket|undefined): boolean {
    return (
        socket !== undefined && socket.readyState == WebSocket.OPEN
    );
}

export const useWebsocketManager = create<WebSocketInterface>((set, get) => ({
    socket: undefined,
    url: '',
    access_token: '',
    id: 2,
    init: (_url: string, _access_token: string) => {
      set((_)=>{
        return {
            "url": _url,
            "access_token": _access_token,
        };
      });
    },
    connect: () => {
       const socket = get().socket;
       const url = get().url;
       const access_token = get().access_token;
       const messageHandler = get().messageHandler;

       if (connected(socket)) {
         return;
       }
       const websocket_url = `${url}/api/websocket`;
       set((state) => {
           const ws = new WebSocket(websocket_url);
           ws.onopen = () => {
               ws.send(JSON.stringify({
                 "type": "auth",
                 "access_token": access_token
               }));
             }; 
           ws.onerror = e => {
               console.log(e);
           }
           
           ws.onmessage = e => {
               const message = JSON.parse(e.data);
               console.log("---", message.type);
               console.log(JSON.parse(e.data));
               
               messageHandler(e);
           }

           return {
               socket: ws
           }; 
       });       

    },
    sendMessage: (message: MessageBase, callback: (event: MessageEvent<any>)=>void)  => {
        //const wsi = get();
        const socket = get().socket;
        const id = get().id;

        if (!connected(socket)) {
            get().connect();
        }

        //console.log("send message");
        //if (connected(socket)) {
         //console.log("end send message");
         const newid = id + 1;
         message.id = message.id ? message.id: newid;
         socket!.send(JSON.stringify(message));
         set((state)=>({id: newid}));
         set((state)=> ({messageHandler: callback}));
         return newid;
        //}

    },
    messageHandler: (event: MessageEvent<any>) => {
        const message = JSON.parse(event.data);
        console.log(message);
    },
    //id: 2, //id:1 is usually used for supportedFeatures message
    //messageHandlers: new Set(),
    /*
    connect: (ha_url: string, access_token: string ) => {    
        console.log("inside connect");
        console.log(ha_url);
        const websocket_url = `${ha_url}/api/websocket`;
        set((state) => {
            if (connected(state.socket)) {
                console.log("already connected.")
                return {};
            }
            const ws = new WebSocket(websocket_url);
            ws.onopen = () => {
                ws.send(JSON.stringify({
                  "type": "auth",
                  "access_token": access_token
                }));
              }; 
            ws.onerror = e => {
                console.log(e);
            }
            
            ws.onmessage = e => {
                const message = JSON.parse(e.data);
                console.log("---", message.type);
                console.log(JSON.parse(e.data));
                
                get().messageHandlers.forEach((handler)=> handler(e));
            }

            return {
                socket: ws
            }; 
        });
    },
    sendMessage: (message: MessageBase): number => {
       const wsi = get();
       //console.log("send message");
       if (connected(wsi.socket)) {
        //console.log("end send message");
        const newid = wsi.id + 1;
        message.id = message.id ? message.id: newid;
        wsi.socket!.send(JSON.stringify(message));
        set((state)=>({id: newid}));
        return newid;
       }
       return 0;
    },
    subscribe:  (handler: (event: MessageEvent<any>) => void) => {
        get().messageHandlers.add(handler);
    },
    unsubscribe: () => {
        const messageHandlers = get().messageHandlers;
        const lastCallback = [...messageHandlers].pop();
        if (lastCallback) {
            messageHandlers.delete(lastCallback);
        }
    },
    */
  }))