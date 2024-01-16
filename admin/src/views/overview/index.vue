// 概览
<template>
  <div class="overview-wrapper">
    <h1>概览</h1>
  </div>
</template>
<script>

export default {
  name: "overView",
  components: {
  },
  data() {
    return {
      topOpen: true,
    };
  },
  created() {},
  mounted() {
  },
  methods: {

    handleCloseAndReloadList() {
      this.topOpen = false;
    },

  },
};
</script>

<style lang="less" scoped>
.overview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
