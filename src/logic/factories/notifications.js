class Notifications{
    static baseMessage(msg, context, type) {
        context.$buefy.notification.open({
            duration: 5000,
            message: `<b>${msg}</b>`,
            position: 'is-bottom-right',
            type: type,
            hasIcon: true
        })
    }
    static infoMessage(msg, context) {
        this.baseMessage(msg, context, 'is-info')
    }

    static successMessage(msg, context) {
        this.baseMessage(msg, context, 'is-success')
    }

    static errorMessage(msg, context) {
        this.baseMessage(msg, context, 'is-danger')
    }
}


export default Notifications