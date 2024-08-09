import { MessageBase } from '@/types/messages';
import { create } from 'zustand'

interface WebSocketInterface {
    socket: WebSocket|undefined,
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