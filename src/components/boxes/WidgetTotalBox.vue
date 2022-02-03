<template>
    <div class="columns">
        <div class="column">
            <WidgetTotal ref="widgetaankopen" title="Aankopen" :period="period" widgetStyle="info" :hasGeleverd="true"/>
        </div>
        <div class="column">
            <WidgetTotal ref="widgetverkopen" title="Verkopen" :period="period" widgetStyle="success"/>
        </div>
        <div class="column">
            <WidgetTotal ref="widgetcreditnota" title="Creditnotas" :period="period" widgetStyle="warning"/>
        </div>
    </div>
</template>



<script>
import WidgetTotal from '../charts/WidgetTotal.vue'
export default {
    name: "WidgetTotalBox",
    components: { WidgetTotal },
    props: {
        period: {
            type: Object
        }
    },
    methods: {
        refreshAll(value){
            this.$refs.widgetaankopen.refresh(value)
            this.$refs.widgetverkopen.refresh(value)
            this.$refs.widgetcreditnota.refresh(value)
        }
    }
}
</script>

<style>

</style>