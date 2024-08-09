
export enum AuthData {
    access_token = "AccessToken",
    refresh_token = "refreshToken",
    ha_url = "haUrl",
    ha_server_list = 'haServerList'
}

export enum AuthClient {
    client_id = 'https://mohankumargupta.github.io',
    redirect_uri = 'https://mohankumargupta.github.io/redirect/bigbutton.html',
}

//export type LongLivedSecret = {
//    longlived_token: string;
//};

export type TokenSecret = {
    //access_token: string;
    refresh_token: string|null;
    longlived_token: string|null;
};

//export type Secrets = LongLivedSecret | TokenSecret;

export function convertToValidKeyName(url: string): string {
    return url.replace(/[^a-zA-Z0-9-_]/g, "_");
}