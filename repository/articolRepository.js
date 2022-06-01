
const fs = require("fs");

// Functia de citire din fisierul db.json
module.exports.readJSONFile = () => {
    return JSON.parse(fs.readFileSync("db.json"))["articole"];
}
  
// Functia de scriere in fisierul db.json
module.exports.writeJSONFile = (content) => {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ articole: content }, null, 4),     // null, 4 => formateaza db.json dupa editare ca sa fie mai organizat
        "utf8",
        err => {
        if (err) {
            console.log(err);
        }
        }
    );
}