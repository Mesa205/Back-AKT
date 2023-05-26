import userCtrl from "../controllers/user.controller.js";

export const usersRoutes=(fastify,opts,done)=>{

    fastify.post("/signup", userCtrl.signup);
    fastify.post("/login", userCtrl.login);

    done()

}
