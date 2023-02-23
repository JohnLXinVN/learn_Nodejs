const db = require("../models")

const getHomePage = async (req, res) => {
    
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

module.exports = {
    getHomePage,

}