const cekRoleDev = (req, res, next) => {
    if (req.user.roles != "dev") return res.status(400).send({message: "Access Denied"})
    console.log("Access Granted as Developer");
    next();
};

const cekRoleCour = (req, res, next) => {
    if (req.user.roles != "cour") return res.status(400).send({message: "Access Denied"})
    console.log("Access Granted as Courier");
    next();
};

module.exports = {cekRoleDev, cekRoleCour};