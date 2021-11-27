import ApiCalls from "../ApiCalls";
import { getAllArtikels, getArtikel, createArtikel, updateArtikel, deleteArtikel, stockArtikel } from "../routes/artikels"
import Socket from "../../logic/factories/socketFactory"

class ArtikelsController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllArtikels, params, callback, context)
    }
    static stock(context, body, socket){
        ApiCalls.update(stockArtikel, body, context, false, socket, Socket.ARTIKELS)
    }

    // Create View
    static create(context, body, socket){
        ApiCalls.create(createArtikel, body, context, true, socket, Socket.ARTIKELS)
    }

    // Update
    static getPreData(context, id, callback){
        ApiCalls.getMultiple([getArtikel(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateArtikel, body, context, true, socket, Socket.ARTIKELS)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteArtikel, body.id, context, true, socket, Socket.ARTIKELS)
    }

}

export default ArtikelsController