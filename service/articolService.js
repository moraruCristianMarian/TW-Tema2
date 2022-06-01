const uuid = require("uuid");
const articolRepository = require("../repository/articolRepository.js")

module.exports.toateArticolele = () => {
    const articole = articolRepository.readJSONFile();
    return articole;
}

module.exports.adaugaArticol = (articolNou) => {
    const articole = articolRepository.readJSONFile();
    articolNou.id = uuid.v4.apply();

    articole.push(articolNou);
    articolRepository.writeJSONFile(articole);

    return articolNou;
}

module.exports.actualizeazaArticole = (id, articolNou) =>
{
    const articole = articolRepository.readJSONFile();

    let articolCautat = null;

    for (let i = 0; i < articole.length; i++)
        if (articole[i].id === id)
        {
            if (articolNou.titlu != "")
                articole[i].titlu = articolNou.titlu;
            if (articolNou.imagine != "")
                articole[i].imagine = articolNou.imagine;

            articolRepository.writeJSONFile(articole);
            articolCautat = articole[i]; break;
        }

    return articolCautat;
}

module.exports.stergeArticol = (id) =>
{
    const articole = articolRepository.readJSONFile();

    for (let i = 0; i < articole.length; i++)
        if (articole[i].id === id)
        {
            articole.splice(i, 1);
            articolRepository.writeJSONFile(articole);
        }
}