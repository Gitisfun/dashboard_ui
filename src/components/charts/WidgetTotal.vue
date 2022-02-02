<template>
    <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb)">
        <p style="font-weight: 700; font-size: 17px; color: black; margin-bottom: 10px">{{ title }}</p>
        <div style="font-size: 14px; margin-bottom: 15px">
            <div style="margin-bottom: 5px;">
                <div v-if="hasGeleverd"><span>Geleverd</span><span style="float: right">{{ geleverd }}</span></div>
                <div v-else><span>-</span><span style="float: right">-</span></div>
            </div>
            <div style="margin-bottom: 5px">
                <div><span>Betaald</span><span style="float: right">{{ betaald }}</span></div>
            </div>
            <div style="margin-bottom: 5px">
                <div><span>Totaal</span><span style="float: right">{{ totaal }}</span></div>
            </div>
        </div>
        <b-progress :type="`is-${widgetStyle}`" size="is-normal" :value="calculateBetaald" show-value></b-progress>
    </div>
</template>

<script>
import StatisticsController from '../../api/calls/statistics';

export default {
    name: "WidgetTotal",
    props: {
        title: {
            type: String
        },
        widgetStyle: {
            type: String
        },
        hasGeleverd: {
            type: Boolean,
            default: false
        },
        period: {
            type: Object
        }
    },
    data(){
        return {
            geleverd: null,
            betaald: 0,
            totaal: null
        }
    },
    mounted(){
        this.fetchData()
    },
    computed: {
        calculateBetaald(){
            if(this.totaal){
                return this.betaald / this.totaal * 100
            }
            return 0
        }
    },
    methods: {
        fetchData(){
            if(this.title === "Aankopen") {
                StatisticsController.getWidgetTotalForAankopen(this, this.period, (res) => {
                    this.geleverd = res[0].data[0].totaal
                    this.betaald = parseInt(res[1].data[0].totaal)
                    this.totaal = res[2].data[0].totaal
                })
            }
            else if(this.title === "Verkopen") {
                StatisticsController.getWidgetTotalForVerkopen(this, this.period, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                })
            }
            else if(this.title === "Creditnotas") {
                StatisticsController.getWidgetTotalForCreditnotas(this, this.period, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                })
            }
        },
        refresh(value){
            if(this.title === "Aankopen") {
                StatisticsController.getWidgetTotalForAankopen(this, value, (res) => {
                    console.log(res);
                    this.geleverd = res[0].data[0].totaal
                    this.betaald = parseInt(res[1].data[0].totaal)
                    this.totaal = res[2].data[0].totaal
                })
            }
            else if(this.title === "Verkopen") {
                StatisticsController.getWidgetTotalForVerkopen(this, value, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                })
            }
            else if(this.title === "Creditnotas") {
                StatisticsController.getWidgetTotalForCreditnotas(this, value, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                })
            }
        }
    }
}
</script>

<style>

</style>