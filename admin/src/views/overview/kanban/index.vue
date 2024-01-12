// 看板
<template>
  <div class="kanbanWrapper">
    <div v-for="i in 20" :key="i" class="testWrapper">{{ i }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultPassword: '',
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    func() {

    },

  },
};
</script>

<style lang="less" scoped>
.kanbanWrapper {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  .testWrapper {
    width: 100%;
    height: 100px;
    margin-bottom: 18px;
    background-color: var(--theme-color-1);
  }
}
</style>
