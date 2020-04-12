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
    <Modal v-model="modal1" title="修改产品" @on-cancel="cancel" fullscreen>
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
      product: {}
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    ok() {
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
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
