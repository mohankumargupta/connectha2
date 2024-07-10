import { useWebsocketManager } from "@/stores/websocket";

export async function websocketconnect(websocket_url: string, access_token: string) {
    const connect = useWebsocketManager((state) => state.connect);
    connect(websocket_url, access_token);
}