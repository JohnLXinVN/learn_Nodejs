import { createNewUser, deleteCrudUser, getAllUsers, getInfoUser, updateCrudUser } from "../services/CRUDservices";

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
//    console.log("------------------------------")
//    console.log(data)
//    console.log("------------------------------")

    return res.render('crudTable.ejs', {data})
}

export const editCrudPage = async (req, res) => {

    const id = await req.query.id;
    if(id) {
        const dataUser = await getInfoUser(id)

        return res.render("editCrud.ejs", {dataUser})
    }else {

        return res.send("User not found")
    }
}

export const putCrudPage = async (req, res) => {
    let data = req.body;
    console.log(data)
    await updateCrudUser(data)
    return res.send("Edit done")
}

export const deleteCrudPage = async (req, res) => {
    let id = req.query.id;
    await deleteCrudUser(id);
    return res.send("Delete done")
}
