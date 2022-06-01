
const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const articolService = require("../service/articolService.js")

// Create
router.post("/articole", (req, res) => {
    let articolNou = articolService.adaugaArticol(req.body);
    res.status(200).send(articolNou);
});

// Read One
router.get("/articole/:id", (req, res) => {
    const articole = articolService.toateArticolele();
    let articolCautat = articole[req.params.id];

    if (articolCautat == null)
        res.status(204).send("Nu s-a gasit articolul.");
    else
        res.status(200).send(articolCautat);
});

// Read All
router.get("/articole", (req, res) => {
    const articole = articolService.toateArticolele();

    if ((articole != undefined) && (articole.length != 0))
        res.status(200).send(articole);
    else
        res.status(204).send("Nu s-a gasit niciun articol.");
});

// Update
router.put("/articole/:id", (req, res) => {
    let articolCautat = articolService.actualizeazaArticole(req.params.id, req.body);
    if (articolCautat == null)
        res.status(204).send("Nu s-a gasit articolul.");
    else
        res.status(200).send(articolCautat);
});

// Delete
router.delete("/articole/:id", (req, res) => {
    let articolSters = articolService.stergeArticol(req.params.id);
    res.status(200).send(articolSters);
});

module.exports = router;