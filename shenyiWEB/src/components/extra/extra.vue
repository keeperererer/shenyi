<template>
  <div class="extra">
    <div class="add">
      <Button
        size="large"
        icon="ios-add"
        shape="circle"
        class="addButton"
        @click="show = !show"
      ></Button>
      <transition name="slide-fade">
        <div class="addInput" v-show="show">
          <Input
            v-model="inputValue"
            placeholder="请输入..."
            style="width: 200px;"
          />
          <Button @click="addName">添加</Button>
        </div>
      </transition>
    </div>
    <Modal v-model="modal1" title="修改名字" @on-ok="ok" @on-cancel="cancel">
      <Input v-model="newName" placeholder="请输入..." style="width: 200px;" />
    </Modal>
    <div class="mainList" v-for="(item, index) in tabList" :key="index">
      <List border>
        <ListItem>
          {{ item.title }}
          <Button type="warning" class="editButton" @click="clickEdit(item.sid)"
            >修改</Button
          >
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sid: null,
      modal1: false,
      newName: "",
      inputValue: "",
      show: false,
      attributeAllList: [], //att中所有的数据
      attributeList: [], //符合条件的数据
      tabList: [],
      attTbName: [] //att中符合条件的tableName
    };
  },
  created() {
    this.attributeListAjax();
  },
  mounted() {},
  methods: {
    attributeListAjax() {
      let that = this;
      this.$http.get("apis/web/getAttribute", {}).then(res => {
        that.attributeAllList = res.data.data;
        that.attributeAllList.forEach(item => {
          if (item.extra == 1 && item.maintenance == 0) {
            that.attributeList.push(item);
            that.attTbName.push(item.tableName);
          }
        });
        that.attributeList.forEach(item => {
          that.tabList.push({
            title: item.sidName,
            key: item.fieldName,
            sid: item.sid
          });
        });
      });
    },
    addName() {
      let that = this;
      let params = {
        name: that.inputValue
      };
      this.$http.get("apis/web/insertExtra", params).then(res => {
        this.$router.go(0);
      });
    },
    clickEdit(sid) {
      this.modal1 = true;
      this.sid = sid;
    },
    ok() {
      let that = this;
      let params = {
        sId: that.sid,
        name: that.newName
      };
      this.$http.get("apis/web/editExtra", params).then(res => {
        this.$router.go(0);
      });
      this.$Message.info("修改成功");
    },
    cancel() {
      this.$Message.info("取消修改");
    }
  }
};
</script>
<style scoped>
.extra {
  width: 60%;
  position: relative;
}
.mainList {
  margin-bottom: 20px;
}
.addButton {
  margin-bottom: 10px;
}
.addInput {
  position: absolute;
  top: 5px;
  left: 50px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.editButton {
  position: absolute;
  right: 15px;
}
</style>
