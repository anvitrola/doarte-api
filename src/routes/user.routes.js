const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
    app.use((req, res, next) => {
        res.header(
            "Access-Controll-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Return users list with name and email of all users 
    //Retorna a lista de usuários com nome e email
    app.get("/all", controller.allAccess);

    //Return user data after verify || Retorna os dados do usuário depois de autenticar
    app.get("/user", authJwt, controller.userBoard);

    //Update user || Atualiza usuário
    app.patch("/user/update", authJwt, controller.updateUser);

    //Deleter user || Deleta o usuário
    app.patch("/user/delete", authJwt, controller.deleteUser);

    //Make donations || Fazer doações
    app.post("/user/donation/:id",authJwt,controller.donation);
}