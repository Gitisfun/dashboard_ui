<template>
  <div
    style="
      padding-top: 10px;
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 25px;
    "
  >
    <SmallTitle text="Totaal" />
    <br />
    <!--
    <div>
      <div style="border: 2px solid #d1d8e0; border-radius: 5px">
        <div style="padding: 20px; background: white">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="totalbox-text">Subtotaal (zonder BTW)</p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p class="totalbox-text">{{ subtotaal }} EUR</p>
              </div>
            </div>
          </div>
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="totalbox-text">BTW</p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p class="totalbox-text">{{ btw }} %</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            border-bottom-style: dashed;
            border-bottom: 2px dashed white;
            background: lightgrey;
          "
        ></div>
        <div style="background: #20bf6b; padding: 20px">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p style="color:white;" class="totalbox-text">Totaal</p>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <p style="color:white;" class="totalbox-text">{{ totaal }} EUR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
    <div>
      <div class="box" style="background: #686de0">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="totalbox-text">Subtotaal (zonder BTW)</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p class="totalbox-text">{{ subtotaal | currencyFormatter }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="box" style="background: #ff7f50">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="totalbox-text">BTW</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p class="totalbox-text">{{ btw | btwFilter }} %</p>
            </div>
          </div>
        </div>
      </div>
      <div class="box" style="background: #22a6b3">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="totalbox-text">Totaal</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p class="totalbox-text">{{ totaal | currencyFormatter }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SmallTitle from "../../components/textfields/SmallTitle.vue";

export default {
  name: "TotalBox",
  components: {
    SmallTitle,
  },
  props: {
    subtotaal: {
      type: [Number, String],
    },
    btw: {
      type: [Number, String],
    },
    totaal: {
      type: Number,
    },
  },
  filters: {
      btwFilter(value){
          if(value === "..."){
              return "..."
          }
          return (value * 100).toFixed(2)
      }
  }
};
</script>

<style scoped>
.totalbox-text {
  font-weight: 600;
  color: white;
  font-size: 15px;
}
</style>
