const db = require("../database/models");

module.exports = (req,res,next) =>{

    res.locals.usuario = false;
    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    }else if(req.cookies.email){
        db.User.findOne({ where:{Email : req.body.email }}).then(user=>{
            req.session.user = user;
            res.locals.user = user;
            return next();
        })

        req.session.user = user;
        res.locals.user = user;
        return next();
    }else{
        return next();
    }
}