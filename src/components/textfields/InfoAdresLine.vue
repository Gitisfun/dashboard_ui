<template>
    <div class="info-line-row">
        <div class="info-line-column-address-left">
            <InfoField :text="info" />
        </div>
        <div v-if="value" class="info-line-column-address-right">
          <!--
          <AddressBoxRead :address="value" />
          -->
            <p class="infofield-address-value">{{ value.straat }} {{ value.huisnummer }} {{ value.bus }}</p>
            <p class="infofield-address-value">{{ value.postcode }} {{ value.gemeente }}</p>
            <p class="infofield-address-value">{{ value.land }}</p>
        </div>
    </div>
</template>

<script>
import InfoField from "../textfields/InfoField.vue"
//import AddressBoxRead from "../common/AddressBoxRead.vue"

export default {
    name: "InfoLine",
    components: {
        InfoField,
       // AddressBoxRead
    },
    props: {
        info: {
            type: String
        },
        value: {
            type: Object
        }
    }
}
</script>


<style scoped>
.info-line-row {
  display: flex;
  margin-bottom: 10px
}

.info-line-column-address-left {
  flex: 40%;
}

.info-line-column-address-right {
  flex: 60%;
}

.infofield-address-value {
  margin-bottom: 0px;
  color: #182C61;
  font-style: normal;
  font-size: 14px;
}
</style>