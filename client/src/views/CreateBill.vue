
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
      @keydown.enter="searchNullReceipts"
    ></v-text-field>
    <template>
      <v-card
        max-width="500"
        class="mx-auto"
        v-if="issetcurrentCommerce"
      >
        <v-card-title>
          <h2>Crear factura de:</h2>
        </v-card-title>
        <v-card-text><h3>
          * RIF empresa:</h3><span v-text="currentCommerce.rif"></span>
        </v-card-text>
        <v-card-text>
          <h4 class="display-1 font-weight-bold">Nombre comercio:</h4>
          <span class="font-weight-thin subheading" v-text="currentCommerce.nombre"></span>
        </v-card-text>
        <v-card-text>
          <h3>* Cantidad de ordenes:</h3>
        </v-card-text>
        <v-card-text>
          <h3>* Monto total:</h3>
        </v-card-text>
        <v-card-text>
          <h3>* Fecha de emision:</h3>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createReceipt">CREAR FACTURA</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  computed: {
    ...mapState('bill', [
      'searchingRif',
      'searchingRifError',
      'currentCommerce',
    ]),
    ...mapGetters('bill', [
      'issetcurrentCommerce',
      'issetSearchingRifError',
    ]),
  },
  methods: {
    ...mapMutations('bill', [
      'setSearchingRif',
      'setSearchingRifError',
      'setcurrentCommerce',
    ]),
    ...mapActions('bill', [
      'searchNullReceipts',
      'createReceipt',
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
