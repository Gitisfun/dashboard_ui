import ApiCalls from "../ApiCalls";
import { getAllGebruikers, checkGebruiker, createGebruiker, updateGebruiker, sundropsGebruiker, deleteGebruiker } from "../routes/gebruikers"
import Socket from "../../logic/factories/socketFactory"

class GebruikerController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllGebruikers, params, callback, context)
    }

    // Create View
    static create(context, body, socket){
        ApiCalls.create(createGebruiker, body, context, false, socket, Socket.ANDERE)
    }

    static check(context, body, callback, errorCallback) {
        ApiCalls.check(checkGebruiker, body, context, callback, errorCallback)
    }

    // Update
    static update(context, body, socket){
        ApiCalls.update(updateGebruiker, body, context, false, socket, Socket.ANDERE)
    }

    static sundrops(context, body, socket){
        ApiCalls.update(sundropsGebruiker, body, context, false, socket, Socket.SUNDROPS)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteGebruiker, body.id, context, false, socket, Socket.ANDERE)
    }

}

export default GebruikerController