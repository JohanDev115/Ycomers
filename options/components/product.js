app.component("product", {
  template: /* vue-html */ `
  <section class="product">
    <section class="product-image">
      <div class="product-thumbnails">
        <div
          v-for="(image, i) in product.images"
          :key="i"
          :class="[{active: activeImage === i}, 'product-thumbnails__thumb']"
          :style="{ backgroundImage: 'url(' + image.thumbnail + ')' }"
          @click="activeImage = i"
        ></div>
      </div>
      <div class="product-image-container">
        <img class="product-image-container__image" :src="product.images[activeImage].image" alt="">
      </div>
    </section>
    <section class="product-description">
      <div class="product-description-header">
        <h2 class="product-description__name">{{ product.name }}</h2>
        <badge :product="product"></badge>
      </div>
      <p class="product-description__status">{{product.stock == 0 ? "No products in stock" : "We still have products in stock"}}</p>
      <p class="product-description__price">$ {{ product.price }}</p>
      <p class="product-description__content">{{ product.description }}</p>
      <form class="discount-box">
        <span>Insert coupon code:</span>
        <input v-model="enteredCoupon" type="text">
        <button @click.prevent="applyDiscount(enteredCoupon)">Enter</button>
      </form>
      <button :disabled="product.stock === 0" class="purchase-button" @click="sendProduct()">Add to Car</button>
    </section>
  </section>
  `,
  props: ["product"],
  emits: ["sendProduct"],
  data() {
    return {
      activeImage: 0,
      enteredCoupon: '',
      couponsList: ["JOHAN", "ARENA"]
    }
  },
  methods: {
    applyDiscount(couponCode) {
      if (this.couponsList.find(coupon => coupon === couponCode)) {
        this.product.price -= 500;
        this.couponsList = this.couponsList.filter(coupon => coupon != couponCode)
      }
    },
    sendProduct() {
      this.$emit('sendProduct', this.product);
    }
  },
})