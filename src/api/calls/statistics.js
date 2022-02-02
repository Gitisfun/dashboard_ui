import ApiCalls from "../ApiCalls";
import { aankopen_period_sum, verkopen_period_sum, creditnotas_period_sum, aankopen_sum, verkopen_sum, creditnotas_sum, aankopen_period_total_geleverd, aankopen_period_total_betaald, aankopen_period_total, verkopen_period_total_betaald, verkopen_period_total, creditnotas_period_total_betaald, creditnotas_period_total } from "../routes/statistics";

class StatisticsController {

    // Widget
    static getWidgetForPeriod(context, body, callback) {
        ApiCalls.getMultiple([aankopen_period_sum(body), verkopen_period_sum(body), creditnotas_period_sum(body)], callback, context)
    }


    // Linechart
    static getLineChartForPeriod(context, body, callback) {
        ApiCalls.getMultiple([aankopen_sum(body), verkopen_sum(body), creditnotas_sum(body)], callback, context)
    }


    // Widget Total
    static getWidgetTotalForAankopen(context, body, callback) {
        ApiCalls.getMultiple([aankopen_period_total_geleverd(body), aankopen_period_total_betaald(body), aankopen_period_total(body)], callback, context)
    }

    static getWidgetTotalForVerkopen(context, body, callback) {
        ApiCalls.getMultiple([verkopen_period_total_betaald(body), verkopen_period_total(body)], callback, context)
    }

    static getWidgetTotalForCreditnotas(context, body, callback) {
        ApiCalls.getMultiple([creditnotas_period_total_betaald(body), creditnotas_period_total(body)], callback, context)
    }
}

export default StatisticsController