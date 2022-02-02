import DateHelper from "../utils/dateHelper"

class Widget {

    static today(){
        return {
            start_date: DateHelper.genericStartOf("day"),
            end_date: DateHelper.genericEndOf("day")
        }
    }

    static week(){
        return {
            start_date: DateHelper.genericStartOf("week"),
            end_date: DateHelper.genericEndOf("week")
        }       
    }

    static month(){
        return {
            start_date: DateHelper.genericStartOf("month"),
            end_date: DateHelper.genericEndOf("month")
        }
    }

    static year(){
        return {
            start_date: DateHelper.genericStartOf("year"),
            end_date: DateHelper.genericEndOf("year")
        }
    }

    static bundle(){
        return {
            today: this.today(),
            week: this.week(),
            month: this.month(),
            year: this.year()
        }
    }
}

export default Widget