import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { getAllLeveranciers, getLeverancier, createLeverancier, updateLeverancier, deleteLeverancier, espLeverancier } from "../routes/leveranciers"
import Socket from "../../logic/factories/socketFactory"

class LeveranciersController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllLeveranciers, params, callback, context)
    }
    static esp(context, body, socket){
        ApiCalls.update(espLeverancier, body, context, false, socket, Socket.LEVERANCIERS)
    }

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body, socket){
        ApiCalls.create(createLeverancier, body, context, true, socket, Socket.LEVERANCIERS)
    }

    // Update
    static getPreDataAndLeverancier(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen(), getLeverancier(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateLeverancier, body, context, true, socket, Socket.LEVERANCIERS)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteLeverancier, body.id, context, true, socket, Socket.LEVERANCIERS)
    }

}

export default LeveranciersController