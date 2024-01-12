// 面包屑组件
<template>
    <div v-if="storyPathList.length > 0" class="breadcrumbWrapper">
      <vuedraggable class="breadcrumbList" v-model="storyPathList" @sort="handleSortList">
          <transition-group>
            <div
              v-for="item in storyPathList"
              :key="item.fullPath"
              :class="targetPath === item.fullPath ? 'breadcrumbItemActive' : 'breadcrumbItem'"
            >
              <el-tooltip :content="item.query.tabName || item.fullPath" placement="top">
                <span @click="handleStoryListPage(item)">{{ item.query.tabName || item.meta.name }}</span>
              </el-tooltip>
              <i v-if="targetPath !== item.fullPath" @click="handleDeletePage(item)" class="delete_btn el-icon-close"></i>
            </div>
          </transition-group>
      </vuedraggable>
      <div class="clearStoryList" @click="handleClearStoryList">
        <el-tooltip content="清除浏览记录" placement="top">
          <i class="el-icon-delete"></i>
        </el-tooltip>
      </div>
    </div>
</template>
<script>
import vuedraggable from 'vuedraggable';
export default {
  components: { vuedraggable },
  watch: {
      '$route': { // $route可以用引号，也可以不用引号  监听的对象
          handler(to){
            this.targetPath = to.fullPath;
            this.getStoryList();
          },
          deep: true, // 深度观察监听 设置为 true
          immediate: true, // 第一次初始化渲染就可以监听到
      }
  },
  data() {
    return {
      targetPath: '/baseInfo',
      isCollapse: false,
      storyPathList: [],
    };
  },

  mounted() {},

  methods: {
    // 点击某个tag
    handleStoryListPage(item){
      this.$router.push(item.fullPath);
    },
    // 删除一个tag
    handleDeletePage(page) {
      const storyPathListStr = this.$commonUtils.getSessionItem('storyPathList') || ''; // 缓存的用户信息
      const sessionList = storyPathListStr ? JSON.parse(storyPathListStr) : [];
      this.storyPathList = [];
      sessionList.forEach(item => {
        if(item.fullPath !== page.fullPath){
          this.storyPathList.push(item)
        }
      })

      this.$commonUtils.setSessionItem('storyPathList', JSON.stringify(this.storyPathList));
    },
    // 拖拽排序
    handleSortList(){
      this.$commonUtils.setSessionItem('storyPathList', JSON.stringify(this.storyPathList));
    },
    // 清除历史记录
    handleClearStoryList() {
      this.$commonUtils.removeSessionItem('storyPathList');
      this.getStoryList();
    },
    getStoryList() {
      const storyPathListStr = this.$commonUtils.getSessionItem('storyPathList') || ''; // 缓存的用户信息
      this.storyPathList = storyPathListStr ? JSON.parse(storyPathListStr) : [];
    },
  },
};
</script>

<style scoped lang="less">
  .breadcrumbWrapper {
    width: 100%;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-color);
    box-sizing: border-box;
    background-color: var(--theme-color-1);
    .breadcrumbList{
      flex: 1;
      padding-right: 16px;
      span {
        display: flex;
        align-items: center;
        overflow-x: auto;
      }
      .breadcrumbItem,
      .breadcrumbItemActive {
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 12px;
        border-radius: 4px;
        flex-shrink: 0;
      }

      .breadcrumbItemActive {
        padding: 2px 8px;
        color: #04db7a;
        border: 1px solid #04db7a;
        cursor: move;
      }
      .breadcrumbItem {
        padding: 2px 5px;
        border: 1px solid #ddd;
        cursor: pointer;
        .delete_btn {
          margin-left: 4px;
          font-size: 12px;
          color: red;
        }
        &:hover {
          color: #009fff;
          border: 1px solid #009fff;
        }
      }
      &::-webkit-scrollbar {
        height: 2px;
        width: 2px;
        background-color: #fff;
      }

      &::-webkit-scrollbar-track {
        background-color: #fff;
        &:hover {
          background-color: #fff;
        }
      }

      &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
      }
    }

    .clearStoryList {
      width: 30px;
      flex-shrink: 0;
      text-align: center;
      cursor: pointer;
      border-left: 1px solid var(--border-color);
      i {
        color: var(--font-color-2);
      }
    }
  }

</style>