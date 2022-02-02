<template>
  <div class="columns">
      <div class="column">
          <StatisticsDate :text="start_date" />
      </div>
      <div class="column">
          <StatisticsDate :text="end_date" />
      </div>
  </div>
</template>

<script>
import StatisticsDate from "../textfields/StatisticsDate.vue"

export default {
    name: "StatisticsDateBox",
    components: {
        StatisticsDate
    },
    props: {
        start_date: {
            type: String
        },
        end_date: {
            type: String
        }
    }
}
</script>

<style>

</style>