<template>
  <div class="detail">
    <div class="detail_left">
      <Carousel autoplay v-model="value2" loop :autoplay-speed="5000">
        <CarouselItem v-for="(pic, index) in product.picUrl" :key="index">
          <div class="demo-carousel">
            <img :src="'/api/uploads/' + product.pId + '/' + pic" alt="产品1" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="detail_right">
      <h2>{{ product.sMingCheng }}</h2>
      <p>
        标准号:<span>{{ product.sBiaoZhun }}</span>
      </p>
      <p>
        类别:<span>{{ product.type }}</span>
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
    </div>
    <div style="clear:both"></div>
    <Button type="primary" @click="modal1 = true">修改</Button>
    <Modal v-model="modal1" title="修改产品" @on-cancel="cancel">
      <div class="addPro">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="150"
        >
          <FormItem label="分类">
            <Cascader :data="types" @on-change="handleChange"></Cascader>
          </FormItem>
          <FormItem label="产品名称" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="输入产品名称"
            ></Input>
          </FormItem>
          <FormItem label="标准号" prop="standardNum">
            <Input
              v-model="formValidate.standardNum"
              placeholder="输入标准号"
            ></Input>
          </FormItem>
          <FormItem label="规格" prop="specification">
            <Input
              v-model="formValidate.specification"
              placeholder="输入规格"
            ></Input>
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
            ></Input>
          </FormItem>
          <FormItem label="附件">
            <input type="file" id="attach" />
          </FormItem>
          <FormItem label="上传产品实例图">
            <input
              type="file"
              multiple
              id="pictures"
              accept="image/x-png,image/gif,image/jpeg,image/bmp"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')"
              >添加
            </Button>
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              >重置
            </Button>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Carousel, CarouselItem, Button, Modal } from "view-design";
const SUCCESS_CODE = 0;

export default {
  components: {
    Carousel,
    CarouselItem,
    Button,
    Modal
  },
  data() {
    return {
      value2: 0,
      modal1: false,
      product: {},
      //以下
      surfaceTreats: [],
      textures: [],
      ERPclasses: [],
      mechanicalFuns: [],
      types: [],
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
        pId: ""
        // check: false,
        // disabled: true
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
      files: null
    };
  },
  mounted() {
    this.getProduct();
    //以下
    this.loadSelection("t_biao_mian_chu_li", this.surfaceTreats);
    this.loadSelection("t_cai_zhi", this.textures);
    this.loadSelection("t_erp_fen_lei", this.ERPclasses);
    this.loadSelection("t_ji_xie_xing_neng", this.mechanicalFuns);
    this.loadTypes();
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    getProduct() {
      this.$http
        .get("/apis/wx/products", { pId: this.$route.params.pId })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            let products = response.data.data;
            if (products.length > 0) {
              that.product = products[0];
              that.loadTypeByTid(that.product.tId);
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
    dealResponse(response, successFunction) {
      if (response.data.errorCode !== SUCCESS_CODE) {
        this.$Message.error(response.data.msg);
      } else {
        successFunction();
      }
    },
    //以下
    handleSubmit(name) {
      console.log("jjjj");
      this.$refs[name].validate(valid => {
        if (valid) {
          this.addProduct();
        } else {
          this.$Message.error("表单校验失败");
          console.log(this.type);
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
    handleChange(value, selectedData) {
      this.formValidate.city = value[value.length - 1];
    },

    addProduct() {
      console.log("adddd");
      let formData = new FormData();
      formData.append("sMingCheng", this.formValidate.name);
      formData.append("sBiaoMianChuLiId", this.formValidate.surfaceTreat);
      formData.append("sBiaoZhun", this.formValidate.standardNum);
      formData.append("sCaiZhiId", this.formValidate.texture);
      formData.append("sERPFenLeiId", this.formValidate.ERPclass);
      formData.append("sERPWuLiaoBianMa", this.formValidate.ERPcode);
      formData.append("sGuiGe", this.formValidate.specification);
      formData.append("sJiXieXingNengId", this.formValidate.mechanicalFun);
      formData.append("pId", this.$route.params.pId);
      formData.append("tId", this.formValidate.city);
      formData.append("extraJson", "{}");
      this.loadFiles(formData, "pictures", "pictures");
      this.loadFiles(formData, "attach", "attach");
      // console.log("formData", formData);
      axios
        .post("/apis/productManage/editOne", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            console.log(response);
            that.$Message.success("修改产品成功");
            that.handleReset("formValidate");
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

    dealResponse(response, successFunction) {
      if (response.data.errorCode !== SUCCESS_CODE) {
        this.$Message.error(response.data.msg);
      } else {
        successFunction();
      }
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
</style>
