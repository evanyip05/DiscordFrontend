let tokenClient;
let gapiInited = false;
let gInited = false;

function gapiLoaded() {
    gapi.load('client', async () => {
        await gapi.client.init({
            apiKey: "AIzaSyAOUjID5aZreP7DmXJjWL0B26Ej6JTu9LI", 
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        });
    });
    gapiInited = true;
    tryHandleAuth();
}

function gLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: "889192406698-a437s18o4v6hlhlm58gf41hc52tg9i58.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.metadata.readonly",
        callback: ""
    });
    gInited = true;
    tryHandleAuth();
}

function tryHandleAuth() {
    if (gapiInited && gInited) {
        handleAuth();
        enablePushNotif();
    }
}
        
function handleAuth() {
    tokenClient.callback = async (resp) => {if (resp.error !== undefined) {throw (resp);}}; 
    tokenClient.requestAccessToken({prompt: "consent"});
    document.getElementById("title").innerText = "discord2";
}

async function enablePushNotif() {
    const currentEndPointUrl = await getCurrentEndPointUrl();        
    fetch("https://www.googleapis.com/drive/v3/files/"+SPREADSHEET_ID+"/watch", {method:"POST", mode:"no-cors", Authorization:"AIzaSyAOUjID5aZreP7DmXJjWL0B26Ej6JTu9LI", headers:{id:"hello!", type:"web_hook", address:currentEndPointUrl, expiration:253370793600000}})
}

document.getElementById("auth").onclick = () => {handleAuth();};
