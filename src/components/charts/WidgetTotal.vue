<template>
    <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb)">
        <p class="widget-total-title">{{ title }}</p>
        <div class="widget-total-content" v-if="isLoaded">
            <WidgetInfoRow :isRowHidden="isGeleverdHidden" text="Geleverd" :quantity="geleverd" :money="geleverdBedrag" />
            <WidgetInfoRow text="Te betalen" :quantity="calculateTeBetalen" :money="calculateTeBetalenBedrag" />
            <WidgetInfoRow text="Betaald" :quantity="betaald" :money="betaaldBedrag" />
            <WidgetInfoRow text="Totaal" :quantity="totaal" :money="totaalBedrag" />
        </div>
        <b-progress :type="`is-${widgetStyle}`" size="is-normal" :value="calculatePercentageBetaald" show-value></b-progress>
    </div>
</template>

<script>
import StatisticsController from '../../api/calls/statistics';
import WidgetInfoRow from '../boxes/WidgetInfoRow.vue';

export default {
    name: "WidgetTotal", 
    components: {
        WidgetInfoRow
    },
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
            isLoaded: false,
            geleverd: null,
            betaald: null,
            totaal: null,
            geleverdBedrag: null,
            betaaldBedrag: null,
            totaalBedrag: null
        }
    },
    mounted(){
        this.fetchData()
    },
    computed: {
        isGeleverdHidden(){
            if(this.title === "Aankopen") return false
            return true
        },
        calculatePercentageBetaald(){
            if(this.totaal){
                return this.betaald / this.totaal * 100
            }
            return 0
        },
        calculateTeBetalen(){
            if(this.totaal) return this.totaal - this.betaald
            return null
        },
        calculateTeBetalenBedrag(){
            if(this.totaalBedrag) return (this.totaalBedrag - this.betaaldBedrag).toFixed(2)
            return null 
        }
    },
    methods: {
        fetchData(){
            if(this.title === "Aankopen") {
                StatisticsController.getWidgetTotalForAankopen(this, this.period, (res) => {
                    this.geleverd = res[0].data[0].totaal
                    this.betaald = parseInt(res[1].data[0].totaal)
                    this.totaal = res[2].data[0].totaal
                    this.geleverdBedrag = res[3].data[0].totaal
                    this.betaaldBedrag = res[4].data[0].totaal
                    this.totaalBedrag = res[5].data[0].totaal
                    this.isLoaded = true
                })
            }
            else if(this.title === "Verkopen") {
                StatisticsController.getWidgetTotalForVerkopen(this, this.period, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                    this.betaaldBedrag = res[2].data[0].totaal
                    this.totaalBedrag = res[3].data[0].totaal
                    this.isLoaded = true
                })
            }
            else if(this.title === "Creditnotas") {
                StatisticsController.getWidgetTotalForCreditnotas(this, this.period, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                    this.betaaldBedrag = res[2].data[0].totaal
                    this.totaalBedrag = res[3].data[0].totaal
                    this.isLoaded = true
                })
            }
        },
        refresh(value){
            if(this.title === "Aankopen") {
                StatisticsController.getWidgetTotalForAankopen(this, value, (res) => {
                    this.geleverd = res[0].data[0].totaal
                    this.betaald = parseInt(res[1].data[0].totaal)
                    this.totaal = res[2].data[0].totaal
                    this.geleverdBedrag = res[3].data[0].totaal
                    this.betaaldBedrag = res[4].data[0].totaal
                    this.totaalBedrag = res[5].data[0].totaal
                    this.isLoaded = true
                })
            }
            else if(this.title === "Verkopen") {
                StatisticsController.getWidgetTotalForVerkopen(this, value, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                    this.betaaldBedrag = res[2].data[0].totaal
                    this.totaalBedrag = res[3].data[0].totaal
                    this.isLoaded = true
                })
            }
            else if(this.title === "Creditnotas") {
                StatisticsController.getWidgetTotalForCreditnotas(this, value, (res) => {
                    this.betaald = parseInt(res[0].data[0].totaal)
                    this.totaal = res[1].data[0].totaal
                    this.betaaldBedrag = res[2].data[0].totaal
                    this.totaalBedrag = res[3].data[0].totaal
                    this.isLoaded = true
                })
            }
        }
    }
}
</script>


<style>
.widget-total-title {
    font-weight: 700; 
    font-size: 17px; 
    color: black; 
    margin-bottom: 10px;
}
.widget-total-content {
    font-size: 14px; 
    margin-bottom: 15px;
}
</style>