<template>
    <div class="info-line-row">
        <div class="info-line-column-left">
            <InfoField :text="info" />
        </div>
        <div class="info-line-column-right">
            <InfoFieldValue :text="value" />
        </div>
    </div>
</template>

<script>
import InfoField from "../textfields/InfoField.vue"
import InfoFieldValue  from "../textfields/InfoFieldValue.vue"

export default {
    name: "InfoLine",
    components: {
        InfoField,
        InfoFieldValue
    },
    props: {
        info: {
            type: String
        },
        value: {
            type: [String, Number]
        }
    }
}
</script>

<style scoped>
.info-line-row {
  display: flex;
}

.info-line-column-left {
  flex: 40%;
}

.info-line-column-right {
  flex: 60%;
}
</style>