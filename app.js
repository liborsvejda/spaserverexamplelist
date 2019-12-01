const createSpaServer = require("spaserver").createSpaServer;
const dateFormat = require('dateformat');

const PORT = 8080; //aplikace na Rosti.cz musi bezet na portu 8080
const API_HEAD = {
    "Content-type": "application/json"
};
const API_STATUS_OK = 0;
const API_STATUS_NOT_FOUND = -1;

let list = new Array();

function processApi(req, res) {
    res.writeHead(200, API_HEAD);
    let obj = {};
    obj.status = API_STATUS_OK;
    if (req.pathname === "/list") {
        obj.list = list;
    } else if (req.pathname === "/add") {
        let addObj = {};  //vytvoreno prazdneho objektu pro vlozeni do seznamu
        let dt = new Date();
        addObj.time = dateFormat(dt, "HH.MM.ss");
        addObj.val = req.parameters.value;
        list.push(addObj); //pridani do seznamu
    } else {
        obj.status = API_STATUS_NOT_FOUND;
        obj.error = "API not found";
    }
    res.end(JSON.stringify(obj));
}

createSpaServer(PORT, processApi);
