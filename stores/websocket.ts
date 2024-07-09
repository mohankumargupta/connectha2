import { create } from 'zustand'

interface WebSocketInterface {
    socket: WebSocket|undefined,
    messageHandlers: Set<(event: string) => void>,
    id: number,
    connect: (ha_url: string, access_token: string, subscribe: (event: string)=>void, unsubscribe: (event: string) => void ) => void,
    send: (message: string) => void,
}

function connected(socket: WebSocket|undefined): boolean {
    return (
        socket !== undefined && socket.readyState == WebSocket.OPEN
    );
}

const useWebsocketManager = create<WebSocketInterface>((set) => ({
    socket: undefined,
    id: 1,
    messageHandlers: new Set(),
    connect: (ha_url: string, access_token: string, subscribe: (event: string)=>void, unsubscribe: (event: string) => void ) => {        
        set((state) => {
            if (connected(state.socket)) {
                return {};
            }
            const ws = new WebSocket(ha_url);
            ws.onopen = () => {
                ws.send(JSON.stringify({
                  "type": "auth",
                  "access_token": access_token
                }));
              };            
            return {
                socket: ws
            }; 
        });
    },
    send: (message: string) => {
       
    },
    //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //removeAllBears: () => set({ bears: 0 }),
  }))