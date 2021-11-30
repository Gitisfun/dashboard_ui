import ApiCalls from "../ApiCalls";
import { getAllBtws, createBtw, updateBtw, deleteBtw } from "../routes/btw"
import Socket from "../../logic/factories/socketFactory"

class BtwController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllBtws, params, callback, context)
    }

    // Create View
    static create(context, body, socket){
        ApiCalls.create(createBtw, body, context, false, socket, Socket.ANDERE)
    }

    // Update
    static update(context, body, socket){
        ApiCalls.update(updateBtw, body, context, false, socket, Socket.ANDERE)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteBtw, body.id, context, false, socket, Socket.ANDERE)
    }

}

export default BtwController