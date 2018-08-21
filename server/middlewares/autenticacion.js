const jwt = require('jsonwebtoken');



// ===============
// VERIFICAR TOKEN
// ===============


let verificaToken = (req, res, next) => {


    let token = req.get('token'); // token por que asi lo definimos podría definirse como Authorization
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });




}


// ===============
// VERIFICAR ADMINROLE
// ===============

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })

    }




};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}