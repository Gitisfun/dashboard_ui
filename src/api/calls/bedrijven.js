import ApiCalls from "../ApiCalls";
import { getBedrijf, updateBedrijf } from "../routes/bedrijven"
import Socket from "../../logic/factories/socketFactory"

class BedrijvenController {

    // Overview
    static get(id, context, callback){
        ApiCalls.getById(getBedrijf, id, callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateBedrijf, body, context, false, socket, Socket.INSTELLINGEN)
    }

}

export default BedrijvenController