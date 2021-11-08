import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { getAllLeveranciers, getLeverancier, createLeverancier, updateLeverancier, deleteLeverancier, espLeverancier } from "../routes/leveranciers"

class LeveranciersController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllLeveranciers, params, callback, context)
    }
    static esp(context, body){
        ApiCalls.update(espLeverancier, body, context, false)
    }

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body){
        ApiCalls.create(createLeverancier, body, context, true)
    }

    // Update
    static getPreDataAndLeverancier(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen(), getLeverancier(id)], callback, context)
    }

    static update(context, body){
        ApiCalls.update(updateLeverancier, body, context, true)
    }

    static deleteById(context, body){
        ApiCalls.deleteById(deleteLeverancier, body.id, context, true)
    }

}

export default LeveranciersController