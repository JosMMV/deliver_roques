
<template>
  <v-container>
    <v-text-field
      class="mx-3"
      flat
      label="Introduzca RIF del comercio"
      prepend-inner-icon="search"
      solo-inverted
      :value="searchingRif"
      @input="setSearchingRif"
      @keydown.enter="preBill"
    ></v-text-field>

    <v-alert type="error" :value="searchingError">{{ searchingError }}.</v-alert>
    <v-alert type="success" :value="successMessage">{{ successMessage }}.</v-alert>

    <Panel v-if="issetcurrentCommerce" :title="currentCommerce.name">
      <v-layout row wrap>
        <v-flex xs4>
          <div class="headline font-weight-thin"># DE TRACKING</div>
        </v-flex>
        <v-flex xs4>
          <div class="headline font-weight-thin">COSTO DE ENVÍO</div>
        </v-flex>
        <v-flex xs4>
          <div class="headline font-weight-thin">CREADA EL</div>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <div class="mt-2" v-for="order in currentCommerce.orders" :key="order.id">
        <v-layout row wrap>
          <slot></slot>
          <v-flex xs4 class="text-xs-left my-4">
            <span>{{ order.tracking_id }}</span>
          </v-flex>
          <v-flex xs4 class="text-xs-left my-4">
            <span>Bs. {{ order.shippingCost }}</span>
          </v-flex>
          <v-flex xs4 class="text-xs-left my-4">
            <span>{{ order.created_at }}</span>
          </v-flex>
        </v-layout>
      </div>
      <v-divider light></v-divider>
      <v-layout row wrap>
        <v-flex xs6>
          <div class="headline font-weight-thin mt-5 text-xs-center">TOTAL :</div>
        </v-flex>
        <v-flex xs6>
          <div class="headline font-weight-thin mt-5">Bs. {{ currentCommerce.amount }}</div>
        </v-flex>
      </v-layout>
      <v-btn
        block
        color="green"
        class="mt-5"
        @click="createBill"
      >
        Crear Factura
      </v-btn>
    </Panel>
  </v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';
import Panel from '@/components/Panel.vue';

export default {
  components: {
    Panel,
  },
  name: 'CreateBill',
  computed: {
    ...mapState('bill', [
      'searchingRif',
      'searchingError',
      'currentCommerce',
      'successMessage',
    ]),
    ...mapGetters('bill', [
      'issetcurrentCommerce',
    ]),
  },
  methods: {
    ...mapMutations('bill', [
      'setSearchingRif',
      'setSearchingRifError',
      'setcurrentCommerce',
    ]),
    ...mapActions('bill', [
      'createBill',
      'preBill',
    ]),
  },
};
</script>
<style>
#imagen {
  display: flex;
  justify-content: center;
}
.imagen {
  width: 25%;
  height: auto;
}
</style>
