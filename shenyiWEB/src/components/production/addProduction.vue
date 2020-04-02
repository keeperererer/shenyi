<template>
  <div class="addPro">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="150"
    >
      <FormItem label="叶级分类" prop="city">
        <Select
          v-model="formValidate.city"
          placeholder="选择产品的叶级分类..."
          filterable
        >
          <Option
            v-for="(item, index) in catesTail"
            :value="item.value"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
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
      <FormItem label="类别" prop="category">
        <Input v-model="formValidate.category" placeholder="输入类别"></Input>
      </FormItem>
      <FormItem label="规格" prop="specification">
        <Input
          v-model="formValidate.specification"
          placeholder="输入规格"
        ></Input>
      </FormItem>
      <FormItem label="机械机能" prop="mechanicalFun">
        <Input
          v-model="formValidate.mechanicalFun"
          placeholder="输入机械机能"
        ></Input>
      </FormItem>
      <FormItem label="表面处理" prop=" surfaceTreat">
        <Input
          v-model="formValidate.surfaceTreat"
          placeholder="输入表面处理"
        ></Input>
      </FormItem>
      <FormItem label="材质" prop="texture">
        <Input v-model="formValidate.texture" placeholder="输入材质"></Input>
      </FormItem>
      <FormItem label="ERP分类" prop="ERPclass">
        <Input
          v-model="formValidate.ERPclass"
          placeholder="输入ERP分类"
        ></Input>
      </FormItem>
      <FormItem label="ERP物料编码" prop="ERPcode">
        <Input
          v-model="formValidate.ERPcode"
          placeholder="输入ERP物料编码"
        ></Input>
      </FormItem>
      <FormItem label="是否上传详细文件">
        <Checkbox
          v-model="formValidate.check"
          label="是否上传详细文件"
          @on-change="checkStatus"
        ></Checkbox>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          show-upload-list
          :disabled="formValidate.disabled"
          :format="['xlsx', 'docx', 'pdf']"
        >
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </FormItem>
      <FormItem label="上传产品实例图">
        <Upload
          multiple
          show-upload-list
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          :format="['jpg', 'jpeg', 'png']"
          :on-format-error="handleFormatError"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-camera" size="52" style="color: #3399ff"></Icon>
            <p>点击或者拖拽到此处上传</p>
          </div>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')"
          >添加</Button
        >
        <Button @click="handleReset('formValidate')" style="margin-left: 8px"
          >重置</Button
        >
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Button,
  Checkbox,
  Upload,
  Icon
} from "view-design";
export default {
  components: {
    Form,
    FormItem,
    Select,
    Option,
    Input,
    Button,
    Checkbox,
    Upload,
    Icon
  },
  data() {
    return {
      catesTail: [
        {
          value: "test",
          label: "test"
        },
        {
          value: "test",
          label: "test"
        }
      ],
      formValidate: {
        name: "",
        city: "",
        standardNum: "",
        category: "",
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
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
    checkStatus() {
      if (this.formValidate.check) {
        this.formValidate.disabled = false;
      } else {
        this.formValidate.disabled = true;
      }
    },
    handleSuccess() {
      this.$Message.info("上传成功");
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    }
  }
};
</script>
