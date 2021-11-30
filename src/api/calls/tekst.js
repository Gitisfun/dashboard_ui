import ApiCalls from "../ApiCalls";
import { getAllTeksten, createTekst, updateTekst, deleteTekst } from "../routes/tekst"
import Socket from "../../logic/factories/socketFactory"

class TekstController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllTeksten, params, callback, context)
    }

    // Create View
    static create(context, body, socket){
        ApiCalls.create(createTekst, body, context, false, socket, Socket.ANDERE)
    }

    // Update
    static update(context, body, socket){
        ApiCalls.update(updateTekst, body, context, false, socket, Socket.ANDERE)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteTekst, body.id, context, false, socket, Socket.ANDERE)
    }

}

export default TekstController