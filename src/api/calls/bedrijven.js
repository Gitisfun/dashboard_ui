import ApiCalls from "../ApiCalls";
import { getBedrijf, updateBedrijf } from "../routes/bedrijven"
import Socket from "../../logic/factories/socketFactory"

class BedrijvenController {

    // Overview
    static get(context, callback){
        ApiCalls.getById(getBedrijf, null, callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateBedrijf, body, context, false, socket, Socket.INSTELLINGEN)
    }

}

export default BedrijvenController