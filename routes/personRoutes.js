const express = require("express");
const router = require("express").Router();
const Person = require("../models/Person");

router.use(
    express.urlencoded({
        extended: true
    })
);
router.use(express.json());

router.post("/", async (req, res) => {
    const {name, salary, approved} = req.body;

    if(!name && !salary && !approved) {
        res.status(422).json({"message": "Nome, salário e aprovado são obrigatórios!"});
        return;
    }

    const person = {
        name: name,
        salary: salary,
        approved: approved
    }

    try {
        await  Person.create(person);
        res.status(201).json({"messsage": "Pessoa inserida com sucesso!"});
    } catch (error) {
        res.status(500).json({"message": error});
    }
});

router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({"message": error});
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const person = await Person.findOne({"_id": id});
        if (!person) {
            res.status(422).json({"message": "O usuário não existe!"});
            return;
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({"message": error});
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, salary, approved} = req.body;
    const person = {
        name: name,
        salary: salary,
        approved: approved
    }
    try {
        const updatedPerson = await Person.updateOne({"_id": id}, person);

        console.log(updatedPerson);

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({"message": "Usuário não encontrado!"});
            return;
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({"message": error});
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({"_id": id});
    if (!person) {
        res.status(422).json({"message": "O usuário não existe!"});
        return;
    }

    try {
        await Person.deleteOne({"_id": id});
        res.status(200).json({"message": "Usuário removido com sucesso!"});
    } catch (error) {
        res.status(500).json({"message": error});
    }

});

module.exports = router;