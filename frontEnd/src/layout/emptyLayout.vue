<template>
    <div class="emptyLayoutWrapper">
        <router-view/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabList:[],
        };
    },
    methods: {

    },
    mounted() {},
}
</script>

<style scoped>
    .emptyLayoutWrapper {
        margin: 0;
        padding: 0;
        width:100%;
        height:100%;
    }
</style>