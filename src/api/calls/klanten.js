import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { getAllKlanten, getKlant, createKlant, updateKlant, deleteKlant, espKlant } from "../routes/klanten"
import Socket from "../../logic/factories/socketFactory"

class KlantenController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllKlanten, params, callback, context)
    }
    static esp(context, body, socket){
        ApiCalls.update(espKlant, body, context, false, socket, Socket.KLANTEN)
    }

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body, socket){
        ApiCalls.create(createKlant, body, context, true, socket, Socket.KLANTEN)
    }

    // Update
    static getPreDataAndKlant(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen(), getKlant(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateKlant, body, context, true, socket, Socket.KLANTEN)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteKlant, body.id, context, true, socket, Socket.KLANTEN)
    }

    // Others
    static getKlant(context, id, callback){
        ApiCalls.getById(getKlant, id, callback, context)
    }

}

export default KlantenController