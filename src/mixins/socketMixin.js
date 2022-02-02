import Socket from "../logic/factories/socketFactory"

export default {
    data(){
        return {
            socket: null
        }
    },
    created(){
        this.socket = Socket.getConnection()
    },
    destroyed(){
        this.socket.close()
    }
}