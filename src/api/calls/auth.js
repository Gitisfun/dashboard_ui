import ApiCalls from "../ApiCalls";
import { userLogin } from "../routes/auth";

class AuthController {

    // Login
    static login(context, body, callback){
        ApiCalls.login(userLogin, body, context, callback)
    }

}

export default AuthController