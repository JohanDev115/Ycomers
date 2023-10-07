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
        <img class="product-image-container__image" :src="product.images[         activeImage].image" alt="">
      </div>
    </section>
    <section class="product-description">
      <div class="product-description-header">
        <h2 class="product-description__name">{{ product.name }}</h2>
        <span class="product-description__badge--new" v-if="product.new">Nuevo</span>
        <span class="product-description__badge--offer" v-if="product.offer">Oferta</span>
      </div>
      <p class="product-description__status">{{ product.stock == 0 ? "No products in stock" : "We still have products in stock"}}</p>
      <p class="product-description__price">$ {{ product.price }}</p>
      <p class="product-description__content">{{ product.description }}</p>
      <div class="discount-box">
        <span>Insert coupon code:</span>
        <input v-model="enteredCoupon" type="text">
        <button @click.prevent="applyDiscount(enteredCoupon)">Enter</button>
      </div>
      <button @click="sendProduct" :disabled="product.stock === 0" class="purchase-button">Add to Car</button>
    </section>
  </section>
  `,
  props: ["product"],
  emits: ["sendProduct"],
  setup(props, { emit }) {

    function sendProduct() {
      emit("sendProduct", props.product)
    }

    const productState = reactive({
      activeImage: 0
    })

    const couponsState = reactive({
      couponList: ["JOHAN", "ARENA"],
      enteredCoupon: ''
    })

    const applyDiscount = (couponCode) => {
      if (couponsState.couponList.find(coupon => coupon === couponCode)) {
        props.product.price -= 500;
        couponsState.couponList = couponsState.couponList.filter(coupon => coupon != couponCode)
      }
    }

    return {
      ...toRefs(productState),
      ...toRefs(couponsState),

      applyDiscount,
      sendProduct
    }
  }
})