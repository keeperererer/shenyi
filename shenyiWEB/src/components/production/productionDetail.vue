<template>
  <div class="detail">
    <div class="detail_left">
      <Carousel autoplay v-model="value2" loop :autoplay-speed="5000">
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/pro1.png" alt="产品1" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/pro1.png" alt="产品1" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/pro1.png" alt="产品1" />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/assets/pro1.png" alt="产品1" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="detail_right">
      <h2>名称</h2>
      <p>标准号:<span>111</span></p>
      <p>类别:<span>111</span></p>
      <p>规格:<span>111</span></p>
      <p>机械性能:<span>111</span></p>
      <p>表面处理:<span>111</span></p>
      <p>材质:<span>111</span></p>
    </div>
    <div style="clear:both"></div>
    <Button type="primary" @click="modal1 = true">修改</Button>
    <Modal
      v-model="modal1"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
import { Carousel, CarouselItem, Button, Modal } from "view-design";
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
      modal1: false
    };
  },
  methods: {
    ok() {
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
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
