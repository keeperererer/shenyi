<template>
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
        <Input v-model="formValidate.name" placeholder="输入产品名称"></Input>
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
        <Button @click="handleReset('formValidate')" style="margin-left: 8px"
          >重置
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
// import {
//   Form,
//   FormItem,
//   Select,
//   Option,
//   Input,
//   Button,
//   Checkbox,
//   Upload,
//   Icon
// } from "view-design";
import axios from "axios";

var SUCCESS_CODE = 0;

export default {
  // components: {
  //   Form,
  //   FormItem,
  //   Select,
  //   Option,
  //   Input,
  //   Button,
  //   Checkbox,
  //   Upload,
  //   Icon
  // },
  data() {
    return {
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
        check: false,
        disabled: true
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
    this.loadSelection("t_biao_mian_chu_li", this.surfaceTreats);
    this.loadSelection("t_cai_zhi", this.textures);
    this.loadSelection("t_erp_fen_lei", this.ERPclasses);
    this.loadSelection("t_ji_xie_xing_neng", this.mechanicalFuns);
    this.loadTypes();
  },

  methods: {
    handleSubmit(name) {
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
      let formData = new FormData();
      formData.append("sMingCheng", this.formValidate.name);
      formData.append("sBiaoMianChuLiId", this.formValidate.surfaceTreat);
      formData.append("sBiaoZhun", this.formValidate.standardNum);
      formData.append("sCaiZhiId", this.formValidate.texture);
      formData.append("sERPFenLeiId", this.formValidate.ERPclass);
      formData.append("sERPWuLiaoBianMa", this.formValidate.ERPcode);
      formData.append("sGuiGe", this.formValidate.specification);
      formData.append("sJiXieXingNengId", this.formValidate.mechanicalFun);
      formData.append("tId", this.formValidate.city);
      formData.append("extraJson", "{}");
      this.loadFiles(formData, "pictures", "pictures");
      this.loadFiles(formData, "attach", "attach");
      axios
        .post("/apis/productManage/addOne", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          let that = this;
          this.dealResponse(response, function() {
            that.$Message.success("添加产品成功");
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
<style scoped></style>
