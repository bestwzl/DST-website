<script src="../babel.config.js"></script>
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      names: "",
    };
  },
  created() {},
  mounted() {
    this.setDefaultTheme();
  },
  methods: {
    setDefaultTheme () {
      const skTheme = this.$commonUtils.getSessionItem('SK_theme');
      let targetTheme = skTheme;
      const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (skTheme) {
        if (skTheme === 'follow') {
          if (isDarkTheme) {
            targetTheme = 'dark'
          } else {
            targetTheme = 'light'
          }
        }
        this.doSetTheme(targetTheme)
      } else {
        this.doSetTheme('light')
      }
    },
    doSetTheme(theme){
      this.$commonUtils.setSessionItem('SK_theme', theme);
      this.$setSysTheme(theme);
    }
  },

};
</script>
<style lang="less">
  html,body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  div,p {
    padding: 0;
    margin: 0;
  }
  h1,h2,h3,h4,h5,h6 {
    padding: 0;
    margin: 0;
  }
  img {
    padding: 0;
    margin: 0;
    font-size: 0;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    background-color: var(--background-color);
    color: var(--font-color-1);
  }
</style>
