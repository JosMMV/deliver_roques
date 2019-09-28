<template>
<v-dialog
  v-model="dialog"
  max-width="1000"
>
  <v-card v-if="!!order">
    <v-card-title class="display-1">
      Detalle de orden {{ order.tracking_id }}.
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4>
          <div class="title font-weight-thin">PRODUCTO</div>
        </v-flex>
        <v-flex xs4>
          <div class="title font-weight-thin">CANTIDAD + PRECIO UNITARIO</div>
        </v-flex>
        <v-flex xs4>
          <div class="title font-weight-thin">TOTAL</div>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <div class="mt-2" v-for="product in order.products" :key="product.pivot.product_id">
        <v-layout row wrap>
          <slot></slot>
          <v-flex xs4 class="text-xs-left my-4">
            <span>{{ product.name }}</span>
          </v-flex>
          <v-flex xs4 class="text-xs-left my-4">
            <span>{{ product.pivot.amount }} * (Bs. {{ product.price }})</span>
          </v-flex>
          <v-flex xs4 class="text-xs-left my-4">
            <span>Bs. {{ product.pivot.amount * product.price }}</span>
          </v-flex>
        </v-layout>
      </div>
      <v-divider light></v-divider>
      <v-layout row wrap>
        <v-flex xs6>
          <div class="headline font-weight-thin mt-5 text-xs-center">Costo de envío :</div>
        </v-flex>
        <v-flex xs6>
          <div class="headline font-weight-thin mt-5">Bs. {{ order.shippingCost }}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        flat="flat"
        @click="$emit('OkClicked')"
      >
        Ok
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'DetailOrder',
  props: ['dialog', 'order'],
};
</script>
