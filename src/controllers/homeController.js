import { createNewUser, getAllUsers } from "../services/CRUDservices";

const db = require("../models")

export const getHomePage = async (req, res) => {
    
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data
        })
    } catch (e) {
        console.log(e)
    }
    return res.render('homepage.ejs')
}

export const crudPage = async (req, res) => {
    
    return res.render('crud.ejs')
}

export const postCrudPage = async (req, res) => {
    const message = await createNewUser(req.body)
    console.log(message)
    return res.send("post crud page done serverS")
}

export const displayCrud = async (req, res) => {
   const data = await getAllUsers()
   console.log("------------------------------")
   console.log(data)
   console.log("------------------------------")

    return res.render('crudTable.ejs', {data})
}
