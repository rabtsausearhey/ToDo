const fs = require("fs");

module.exports.getUserByLogin = login => {
    const rawUserPool = fs.readFileSync("database/users.json", "utf8");
    const userPool = JSON.parse(rawUserPool)["users"];
    let user = null;
    userPool.forEach((val,index)=>{
        if(val.login === login){
            user = val;
            return true;
        }
    });
    return user;
};
