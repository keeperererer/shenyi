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
              v-for="(item, index) in tabList"
              :key="index"
              :value="item.title"
              >{{ item.title }}</Option
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
    <div class="mainList" v-for="(item, index) in tabList" :key="index">
      <strong>{{ item.title }}</strong>
      <List border>
        <ListItem v-for="(k, index) in mianTable[index]" :key="index">
          {{ k.name }}
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectValue: "",
      inputValue: "",
      show: false,
      attributeAllList: [], //att中所有的数据
      attributeList: [], //符合条件的数据
      tabList: [],
      attTbName: [], //att中符合条件的tableName
      mianTable: [] //根据tableName得到所有数据
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
        that.attributeList.forEach(item => {
          that.tabList.push({
            title: item.sidName,
            key: item.fieldName
          });
        });
        this.mainTableAjax();
      });
    },
    async mainTableAjax() {
      let that = this;
      for (let i = 0; i < that.attTbName.length; i++) {
        let params = {
          tableName: that.attTbName[i]
        };
        await this.$http
          .get("apis/web/getMaintainableTables", params)
          .then(res => {
            let mianData = res.data.data;
            let mianDataJson = JSON.parse(JSON.stringify(mianData));
            that.mianTable.push(JSON.parse(JSON.stringify(mianDataJson)));
          });
      }
    },
    addName() {
      console.log("添加");
    },
    addName() {
      console.log("添加", this.selectValue + this.inputValue);
      let that = this;
      let params = {
        name: that.inputValue,
        tableName: that.selectValue
      };
      console.log(params);
      this.$http.get("apis/web/insertMaintainableTables", params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.maintain {
  /* width: 50%; */
  /* margin: 0 auto; */
  position: relative;
}
strong {
  margin-bottom: 10px;
  display: inline-block;
}
.mainList {
  width: 40%;
  margin-bottom: 30px;
  margin-right: 10px;
  display: inline-block;
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
</style>
