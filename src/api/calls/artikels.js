import ApiCalls from "../ApiCalls";
//import { getAllLeveranciers } from "../routes/leveranciers"
import { getAllArtikels/*, getArtikel,*/, createArtikel/*, updateArtikel, deleteArtikel*/, stockArtikel } from "../routes/artikels"
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
   

}

export default ArtikelsController