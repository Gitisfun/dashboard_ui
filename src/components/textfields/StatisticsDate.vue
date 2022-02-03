<template>
    <span class="statistics-date-item-box">{{ text }}</span>
</template>

<script>
export default {
    name: "StatisticsDate",
    props: {
        text: {
            type: String
        }
    }
}
</script>

<style>
.statistics-date-item-box{
    display: table; 
    margin: 0 auto;
    font-size: 14px;
    border: 1px solid white;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 25px;
    padding-left: 25px;
    background: white;
}
</style>