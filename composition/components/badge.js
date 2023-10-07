app.component("badge", {
  template: /* vue-html */ `
    <span class="product-description__badge--new" v-if="product.new">Nuevo</span>
    <span class="product-description__badge--offer" v-if="product.offer">Oferta</span>
  `,
  props: ["product"]
})