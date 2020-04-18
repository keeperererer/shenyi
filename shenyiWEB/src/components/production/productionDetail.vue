<template>
  <div class="detail">
    <Button @click="backToList" class="back" type="primary" ghost
      ><Icon type="md-arrow-back" />返回</Button
    >
    <div class="detail_left">
      <Carousel v-model="value2" arrow="never">
        <CarouselItem v-for="(pic, index) in product.picUrl" :key="index">
          <div class="demo-carousel">
            <img
              :src="
                'https://shenyi.looyeagee.cn/uploads/' + product.pId + '/' + pic
              "
              alt="产品1"
            />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="detail_right">
      <h2>产品名称：{{ product.sMingCheng }}</h2>
      <p>
        分类:<span>{{ product.tName }}</span>
      </p>
      <p>
        标准号:<span>{{ product.sBiaoZhun }}</span>
      </p>
      <p>
        规格:<span>{{ product.sGuiGe }}</span>
      </p>
      <p>
        机械性能:<span>{{ product.sJiXieXingNeng }}</span>
      </p>
      <p>
        表面处理:<span>{{ product.sBiaoMianChuLi }}</span>
      </p>
      <p>
        材质:<span>{{ product.sCaiZhi }}</span>
      </p>
      <p>
        ERP分类:<span>{{ product.sERPFenLei }}</span>
      </p>
      <p>
        ERP物料编码:<span>{{ product.sERPWuLiaoBianMa }}</span>
      </p>
      <p v-for="(item, index) in fields" :key="index" :value="item.value">
        {{ item["sidName"] }}: <span>{{ item["value"] }}</span>
      </p>
    </div>
    <div style="clear:both"></div>
    <Button type="primary" @click="modal1 = true"
      ><Icon type="ios-color-wand" />修改</Button
    >
    <!-- 弹出的修改框 -->
    <Modal v-model="modal1" title="修改产品">
      <div class="editPro">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="150"
        >
          <FormItem label="分类">
            <p>{{ product.type }}</p>
            <span style="font-size:12px;color:#ccc;">如无需修改，请勿选择</span>
            <Cascader :data="types" @on-change="handleChange"></Cascader>
          </FormItem>
          <FormItem label="产品名称" prop="name">
            <Input v-model="formValidate.name" placeholder="输入产品名称" />
          </FormItem>
          <FormItem label="标准号" prop="standardNum">
            <Input
              v-model="formValidate.standardNum"
              placeholder="输入标准号"
            />
          </FormItem>
          <FormItem label="规格" prop="specification">
            <Input
              v-model="formValidate.specification"
              placeholder="输入规格"
            />
          </FormItem>
          <FormItem label="机械机能" prop="mechanicalFun">
            <Select
              v-model="formValidate.mechanicalFun"
              placeholder="选择产品的机械机能..."
              filterable
            >
              <Option
                v-for="(item, index) in mechanicalFuns"
                :value="item.value"
                :key="index"
                >{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="表面处理" prop=" surfaceTreat">
            <Select
              v-model="formValidate.surfaceTreat"
              placeholder="选择产品的表面处理..."
              filterable
            >
              <Option
                v-for="(item, index) in surfaceTreats"
                :value="item.value"
                :key="index"
                >{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="材质" prop="texture">
            <Select
              v-model="formValidate.texture"
              placeholder="选择产品的材质..."
              filterable
            >
              <Option
                v-for="(item, index) in textures"
                :value="item.value"
                :key="index"
                >{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ERP分类" prop="ERPclass">
            <Select
              v-model="formValidate.ERPclass"
              placeholder="选择产品的ERP分类..."
              filterable
            >
              <Option
                v-for="(item, index) in ERPclasses"
                :value="item.value"
                :key="index"
                >{{ item.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="ERP物料编码" prop="ERPcode">
            <Input
              v-model="formValidate.ERPcode"
              placeholder="输入ERP物料编码"
            />
          </FormItem>
          <FormItem
            :label="item['sidName']"
            v-for="(item, index) in fields"
            :key="index"
            :value="item.value"
          >
            <Input
              v-model="item['value']"
              :placeholder="'请输入' + item['sidName']"
            />
          </FormItem>
          <FormItem label="是否替换附件">
            <input type="file" id="attach" />
          </FormItem>
          <FormItem label="上传产品实例图">
            <div
              v-for="(pic, index) in formValidate.pics"
              :key="index"
              id="maskPic"
            >
              <Icon
                type="md-close"
                class="editPicsIcon"
                @click="delpic(product.pId, pic)"
              />
              <img
                :src="
                  'https://shenyi.looyeagee.cn/uploads/' +
                    product.pId +
                    '/' +
                    pic
                "
                alt="产品"
              />
            </div>
            <input
              type="file"
              multiple
              id="pictures"
              accept="image/x-png,image/gif,image/jpeg,image/bmp"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')"
              >修改
            </Button>
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              >重置
            </Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
// import { Button, Carousel, CarouselItem, Modal } from "view-design";
import axios from "axios";

const SUCCESS_CODE = 0;
export default {
  // components: {
  //   Carousel,
  //   CarouselItem,
  //   Button,
  //   Modal
  // },
  data() {
    return {
      fromPage: "",
      value2: 0,
      modal1: false,
      product: {},
      surfaceTreats: [],
      textures: [],
      ERPclasses: [],
      mechanicalFuns: [],
      types: [],
      //修改页面中的默认数据
      formValidate: {
        name: "",
        city: "",
        standardNum: "",
        specification: "",
        mechanicalFun: "",
        surfaceTreat: "",
        texture: "",
        ERPclass: "",
        ERPcode: "",
        check: false,
        disabled: true,
        pics: []
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ]
      },
      files: null,
      fields: []
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "Production") {
  //     // this.fromPage = "列表页";
  //     next(vm => {
  //       vm.fromPage = "列表页";
  //     });
  //   }
  //   if (from.name == "searchProduction") {
  //     // this.fromPage = "搜索页";
  //     next(vm => {
  //       vm.fromPage = "搜索页";
  //     });
  //   }
  // },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name == "Production" || to.name == "searchProduction") {
  //     if (!from.meta.keepAlive) {
  //       to.meta.keepAlive = true;
  //     }
  //   } else {
  //     from.meta.keepALive = false;
  //     to.meta.keepAlive = false;
  //     this.$destroy();
  //   }
  //   next();
  // },
  created() {},
  mounted() {
    this.fromPage = this.$route.query.from;
    this.getAttribute();
    this.getProduct();
    this.loadSelection("t_biao_mian_chu_li", this.surfaceTreats);
    this.loadSelection("t_cai_zhi", this.textures);
    this.loadSelection("t_erp_fen_lei", this.ERPclasses);
    this.loadSelection("t_ji_xie_xing_neng", this.mechanicalFuns);
    this.loadTypes();
  },
  methods: {
    cancel() {
      // this.$Message.info("Clicked cancel");
    },
    //详情页面数据的获取
    getProduct() {
      this.$http
        .get("/apis/wx/products", { pId: this.$route.query.pId })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            let products = response.data.data;
            if (products.length > 0) {
              that.product = products[0];
              that.loadTypeByTid(that.product.tId);
              that.loadFormValidate(that.product);
              that.loadExtraFields(that.product.extra);
            }
          });
        });
    },
    loadTypeByTid(tId) {
      this.$http
        .get("/apis/web/getMaintainableTables", { tableName: "type" })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            let types = response.data.data;
            for (let i = 0; i < types.length; ++i) {
              if (types[i]["tId"] === tId)
                that.product["type"] = types[i]["tName"];
            }
          });
        });
    },
    loadFormValidate(product) {
      this.formValidate.name = product.sMingCheng;
      this.formValidate.standardNum = product.sBiaoZhun;
      this.formValidate.specification = product.sGuiGe;
      this.formValidate.mechanicalFun = product.sJiXieXingNengId;
      this.formValidate.surfaceTreat = product.sBiaoMianChuLiId;
      this.formValidate.texture = product.sCaiZhiId;
      this.formValidate.ERPclass = product.sERPFenLeiId;
      this.formValidate.ERPcode = product.sERPWuLiaoBianMa;
      this.formValidate.pics = product.picUrl;
    },
    loadExtraFields(extra) {
      for (let i = 0; i < this.fields.length; ++i) {
        this.fields[i]["value"] = extra[this.fields[i]["fieldName"]];
      }
    },
    dealResponse(response, successFunction) {
      if (response.data.errorCode !== SUCCESS_CODE) {
        this.$Message.error(response.data.msg);
      } else {
        successFunction();
      }
    },

    loadSelection(tableName, fieldName) {
      this.$http
        .get("/apis/web/getMaintainableTables", {
          tableName: tableName
        })
        .then(response => {
          this.dealResponse(response, function() {
            let data = response.data.data;
            for (let i = 0; i < data.length; ++i) {
              fieldName.push({
                value: data[i]["id"],
                label: data[i]["name"]
              });
            }
          });
        });
    },

    loadTypes() {
      this.$http.get("/apis/web/types").then(response => {
        let that = this;
        this.dealResponse(response, function() {
          that.types = response.data.data;
          that._decorateTypes(that.types);
        });
      });
    },

    _decorateTypes(types) {
      for (let i = 0; i < types.length; ++i) {
        types[i]["label"] = types[i]["title"];
        if (types[i].hasOwnProperty("children")) {
          this._decorateTypes(types[i]["children"]);
        }
      }
    },
    //修改产品
    editProduct() {
      let formData = new FormData();
      formData.append("pId", this.$route.query.pId);
      formData.append("sMingCheng", this.formValidate.name);
      formData.append("sBiaoMianChuLiId", this.formValidate.surfaceTreat);
      formData.append("sBiaoZhun", this.formValidate.standardNum);
      formData.append("sCaiZhiId", this.formValidate.texture);
      formData.append("sERPFenLeiId", this.formValidate.ERPclass);
      formData.append("sERPWuLiaoBianMa", this.formValidate.ERPcode);
      formData.append("sGuiGe", this.formValidate.specification);
      formData.append("sJiXieXingNengId", this.formValidate.mechanicalFun);
      formData.append("tId", this.formValidate.city);
      formData.append("extraJson", this.getExtraFieldsJsonStr());
      this.loadFiles(formData, "pictures", "pictures");
      this.loadFiles(formData, "attach", "attach");
      axios
        .post("/apis/productManage/editOne", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            that.$Message.success(response.data.msg);
            that.getProduct();
            that.modal1 = false;
          });
        });
    },

    loadFiles(formData, keyName, domId) {
      let picDom = document.getElementById(domId);
      let files = picDom.files;
      for (let i = 0; i < files.length; ++i) {
        formData.append(keyName, files[i]);
      }
    },

    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.editProduct();
        } else {
          this.$Message.error("表单校验失败");
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },

    getExtraFieldsJsonStr() {
      let res = {};
      for (let i = 0; i < this.fields.length; ++i) {
        res[this.fields[i]["fieldName"]] = this.fields[i]["value"];
      }
      return JSON.stringify(res);
    },

    getAttribute() {
      this.$http.get("/apis/web/getAttribute").then(response => {
        let that = this;
        this.dealResponse(response, function() {
          that.fields = [];
          let fields = response.data.data;
          for (let i = 0; i < fields.length; ++i) {
            if (fields[i]["extra"] === 1) {
              that.fields.push({
                fieldName: fields[i]["fieldName"],
                sidName: fields[i]["sidName"],
                value: ""
              });
            }
          }
        });
      });
    },

    handleChange(value, selectedData) {
      this.formValidate.city = value[value.length - 1];
    },
    delpic(pId, pic) {
      console.log("删除图片", pId + pic);
      let params = {
        pId,
        fileName: pic
      };
      console.log("params", params);

      this.$http.post("apis/productManage/delOneFile", params).then(res => {
        console.log(res);
        this.$Message.success({ content: "删除成功", duration: 3 });
        this.getProduct();
      });
    },
    //返回列表页
    backToList() {
      console.log("click");
      if (this.fromPage == "list") {
        this.$router.push({
          name: "Production",
          query: { page: this.$route.query.page }
        });
      }
      if (this.fromPage == "searchList") {
        this.$router.push({
          name: "searchProduction",
          query: { text: this.$route.query.text, page: this.$route.query.page }
        });
      }
    }
  }
};
</script>
<style scoped>
.detail {
  position: relative;
}

.detail_left {
  float: left;
  width: 40%;
}

.detail_right {
  float: left;
  width: 42%;
  margin-left: 10%;
}

h2 {
  color: #515a6e;
}

.detail_right p {
  color: #515a6e;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 600;
}

.detail_right span {
  font-weight: 300;
  margin-left: 10px;
}
#maskPic {
  /* width: 100px; */
  display: inline-block;
  background: rgba(79, 81, 82, 0.2);
  margin-right: 5px;
  margin-bottom: 5 px;
}
#maskPic img {
  width: 100px;
}
.editPicsIcon:hover {
  background-color: #ccc;
}
.maskPic {
  background-color: red !important;
}
.back {
  display: block;
  margin-bottom: 14px;
}
</style>
