import { MessageBase, subscribe_trigger } from '@/types/messages';
import { create } from 'zustand'

interface WebSocketInterface {
    socket: WebSocket|undefined,
    url: string,
    access_token: string,
    nextMessageId: number,
    triggerid: number,
    id: number,
    incrementMessageId: () => number,
    init: (url: string, access_token: string) => void,
    connect: () => void,
    sendMessage: (message: MessageBase, callback: (event: MessageEvent<any>)=>void)  => number,
    sendMessageTrigger: (entity_id: string, callback: (event: MessageEvent<any>)=>void)  => void,
    //subscribe_trigger: (message: MessageBase, callback: (event: MessageEvent<any>)=>void) => void,
    callback: ((event: MessageEvent<any>) => void)|undefined;
    triggerCallback: ((event: MessageEvent<any>) => void)|undefined;
    registerCallBack: (callback: (event: MessageEvent<any>) => void) => void,
    clearCallback: () => void,
    registerTriggerCallBack: (callback: (event: MessageEvent<any>) => void) => void,
    clearRegisterCallback: () => void,
    //messageHandler: (event: MessageEvent<any>) => void,

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
    callback: undefined,
    triggerCallback: undefined,
    nextMessageId: 1,
    triggerid: 0,
    incrementMessageId: () => {
       set((state)=>({"nextMessageId":state.nextMessageId + 1}));
       return get().nextMessageId;
    },
    registerCallBack: (callback: (event: MessageEvent<any>) => void) => {
        console.log("about to register callback");
        set((state) => ({
            callback,
          }));
    },
    clearCallback: () => {
        set(() => ({
            callback: undefined,
        }));
    },
    //subscribe_trigger: (message: MessageBase, callback: (event: MessageEvent<any>)=>void) => {
    //
    //},
    registerTriggerCallBack: (triggerCallback: (event: MessageEvent<any>) => void) => {
        console.log("about to register trigger callback");
        set((state) => ({
            triggerCallback,
          }));        
    },
    clearRegisterCallback: () => {},
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
       //const messageHandler = get().messageHandler;
       //const callback = get().callback;

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
               const callback = get().callback;
               const clearCallback = get().clearCallback;
               const message = JSON.parse(e.data);
               //console.log(message);
               const id = get().id;
               const triggerid = get().triggerid;
               const triggerCallback = get().triggerCallback; 
               
               if (message.type === 'event') {
                console.log("---", message.type);
                if (triggerCallback) {
                    triggerCallback(e);
                }
               }
               
               else if (message.type === 'result') {
                console.log(`---id: ${id} `);
                if (callback) {
                 console.log("callback defined");
                 callback(e);
                 clearCallback();
                }
                else {
                 
                 console.log(`callback not defined id: ${id}`);
                }
               }

               //console.log(`id: ${id} triggerid: ${triggerid}`);
               //console.log(JSON.parse(e.data));

                
               //if (message["id"]) {
                 //console.log(`inside onmessage-id: ${message["id"]}`);
                 //messageHandler(e);

               //}
               
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
        const registerCallBack = get().registerCallBack;

        if (!connected(socket)) {
            console.log("not connected. try connecting");
            get().connect();
        }



        //console.log("send message");
        //if (connected(socket)) {
         //console.log("end send message");
         //const newid = id + 1;
         const newid = get().incrementMessageId();
         message.id = message.id ? message.id: newid;
         console.log(`send message with messageid: ${message.id}`);

         registerCallBack(callback);
         setTimeout(()=>{
            //console.log("is callback defined?");
            //console.log(get().callback);
            socket!.send(JSON.stringify(message));
         }, 0);
        
         set((state)=>({id: newid}));
         //set((state) => ({ messageHandler: callback }), true);
         
         return newid;
        //}

    },
    sendMessageTrigger(entity_id, callback) {
        const socket = get().socket;
        const id = get().id;
        const registerTriggerCallBack = get().registerTriggerCallBack;

        if (!connected(socket)) {
            console.log("not connected. try connecting");
            get().connect();
        }



        //console.log("send message");
        //if (connected(socket)) {
         //console.log("end send message");
         //const newid = id + 1;
         const newid = get().incrementMessageId();
        // message.id = message.id ? message.id: newid;
         
         registerTriggerCallBack(callback);
         setTimeout(()=>{
            //console.log("is callback defined?");
            //console.log(get().callback);
            let message:MessageBase = subscribe_trigger(entity_id);
            message.id = newid;
            //console.log(message)
            socket!.send(JSON.stringify(message));
         }, 0);
        
         set((state)=>({id: newid}));
         //set((state) => ({ messageHandler: callback }), true);
         
         //return newid;
        
    },
    //messageHandler: undefined
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