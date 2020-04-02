<template>
  <div class="addPro">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <FormItem label="叶级分类" prop="city">
        <Select v-model="formValidate.city" placeholder="选择产品的叶级分类...">
          <Option
            v-for="item in catesTail"
            :value="item.value"
            :key="item.value"
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
import { Form, FormItem, Select, Option, Input, Button } from "view-design";
export default {
  components: {
    Form,
    FormItem,
    Select,
    Option,
    Input,
    Button
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
        ERPcode: ""
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
    }
  }
};
</script>
