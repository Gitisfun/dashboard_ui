import ApiCalls from "../ApiCalls";
import { getCounter, updateCounter } from "../routes/counters"
import Socket from "../../logic/factories/socketFactory"

class CountersController {

    // Overview
    static get(context, params, callback){
        ApiCalls.getAll(getCounter, params, callback, context)
    }

    // Update
    static update(context, body, socket){
        ApiCalls.update(updateCounter, body, context, false, socket, Socket.INSTELLINGEN)
    }

}

export default CountersController