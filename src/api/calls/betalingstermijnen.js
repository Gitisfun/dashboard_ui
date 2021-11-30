import ApiCalls from "../ApiCalls";
import { getAllBetalingstermijnen, createBetalingstermijn, updateBetalingstermijn, deleteBetalingstermijn } from "../routes/betalingstermijnen"
import Socket from "../../logic/factories/socketFactory"

class BetalingstermijnenController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllBetalingstermijnen, params, callback, context)
    }

    // Create View
    static create(context, body, socket){
        ApiCalls.create(createBetalingstermijn, body, context, false, socket, Socket.ANDERE)
    }

    // Update
    static update(context, body, socket){
        ApiCalls.update(updateBetalingstermijn, body, context, false, socket, Socket.ANDERE)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteBetalingstermijn, body.id, context, false, socket, Socket.ANDERE)
    }

}

export default BetalingstermijnenController