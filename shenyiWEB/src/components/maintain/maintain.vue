<template>
  <div class="maintain">
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
          <Select v-model="selectValue" style="width: 200px;" filterable>
            <Option
              v-for="(item, index) in selectList"
              :key="index"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
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
      <strong>{{ item.title }} / {{ item.tableName }}</strong>
      <List border>
        <ListItem v-for="(k, index) in mianTable[index]" :key="index">
          {{ k.name }}
          <Button
            type="warning"
            class="editButton"
            @click="clickEdit(item.tableName, k.id)"
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
      tableName: null,
      id: null,
      modal1: false,
      newName: "",
      selectValue: "",
      inputValue: "",
      show: false,
      attributeAllList: [], //att中所有的数据
      attributeList: [], //符合条件的数据
      tabList: [],
      attTbName: [], //att中符合条件的tableName
      mianTable: [], //根据tableName得到所有数据
      selectList: []
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
          if (item.extra == 0 && item.maintenance == 1) {
            that.attributeList.push(item);
            that.attTbName.push(item.tableName);
          }
        });
        that.selectList = that.attTbName.toString().split(",");
        that.attributeList.forEach(item => {
          that.tabList.push({
            title: item.sidName,
            key: item.fieldName,
            tableName: item.tableName
          });
        });
        this.mainTableAjax();
      });
    },
    async mainTableAjax() {
      this.$Loading.start();
      let that = this;
      for (let i = 0; i < that.attTbName.length; i++) {
        let params = {
          tableName: that.attTbName[i]
        };
        await this.$http
          .get("apis/web/getMaintainableTables", params)
          .then(res => {
            this.$Loading.finish();
            let mianData = res.data.data;
            let mianDataJson = JSON.parse(JSON.stringify(mianData));
            that.mianTable.push(JSON.parse(JSON.stringify(mianDataJson)));
          });
      }
    },
    addName() {
      let that = this;
      let params = {
        name: that.inputValue,
        tableName: that.selectValue
      };
      this.$http.get("apis/web/insertMaintainableTables", params).then(res => {
        this.$router.go(0);
      });
    },
    clickEdit(tableName, id) {
      this.modal1 = true;
      this.tableName = tableName;
      this.id = id;
    },
    ok() {
      let that = this;
      let params = {
        tableName: that.tableName,
        id: that.id,
        name: that.newName
      };
      this.$http.get("apis/web/editaintainableTables", params).then(res => {
        this.$router.go(0);
        // this.attributeListAjax();
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
.maintain {
  width: 60%;
  position: relative;
}
strong {
  margin-bottom: 10px;
  display: inline-block;
}
.mainList {
  margin-bottom: 30px;
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
