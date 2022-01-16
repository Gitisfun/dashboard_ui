import ApiCalls from "../ApiCalls";
import { getAllVerkopen, getVerkoop, createVerkoop, updateVerkoop, deleteVerkoop, paidVerkoop } from "../routes/verkopen"
import { getAllBtws } from "../routes/btw"
import { getCounter } from "../routes/counters";
import Socket from "../../logic/factories/socketFactory"
class VerkopenController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllVerkopen, params, callback, context)
    }

    static paid(context, body, socket){
        ApiCalls.update(paidVerkoop, body, context, false, socket, Socket.VERKOPEN)
    }


    // Create View
    static getPreData(context, callback){
        ApiCalls.getMultiple([getAllBtws(), getCounter()], callback, context)
    }

    static create(context, body, socket){
        ApiCalls.create(createVerkoop, body, context, true, socket, Socket.VERKOPEN)
    }


    // Update
    static getPreDataUpdate(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getVerkoop(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateVerkoop, body, context, true, socket, Socket.VERKOPEN)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteVerkoop, body.id, context, true, socket, Socket.VERKOPEN)
    }

}

export default VerkopenController