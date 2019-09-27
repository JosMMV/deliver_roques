<template>
  <v-container>
    <v-card>
      <v-card-title>
        Órdenes de distribución
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar orden"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :rows-per-page-text="text"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        sort-icon="mdi-menu-down"
      >
        <template v-slot:items="props">
          <td>{{ props.item.tracking_id }}</td>
          <td class="text-xs-center">{{ props.item.client.ci }}</td>
          <td class="text-xs-center">{{ props.item.subsidiary.name }}</td>
          <td v-if="isAdminUser" class="text-xs-center">{{ props.item.commerce.name }}</td>
          <td v-else class="text-xs-center">N/A</td>
          <td class="text-xs-center">
            <v-chip
              small
              :class="`${ getStatus(props.item.packed,
              props.item.subsidary) } white--text my-2 caption`"
            >
              {{ getStatus(props.item.packed, props.item.subsidary) }}
            </v-chip>
          </td>
          <td class="text-xs-center">{{ props.item.shippingCost }}</td>
          <td class="text-xs-center">{{ getDate(props.item.shippingTime) }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            No se han encontrado resultados para "{{ search }}".
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'Orders',
  data() {
    return {
      search: '',
      text: 'Filas a mostrar',
      headers: [
        { text: 'Tracking', value: 'tracking_id', align: 'center' },
        { text: 'Cliente', value: 'client_id', align: 'center' },
        { text: 'Sucursal', value: 'subsidiary_id', align: 'center' },
        { text: 'Comercio', value: 'commerce_id', align: 'center' },
        { text: 'Estatus', value: 'status', align: 'center' },
        { text: 'Costo envío', value: 'shippingCost', align: 'center' },
        { text: 'Fecha de entrega*', value: 'shippingTime', align: 'center' },
      ],
    };
  },
  mounted() {
    this.fetchOrders({ isAdminUser: this.isAdminUser, commerceID: this.commerceID });
  },
  computed: {
    ...mapState('order', [
      'orders',
    ]),
    ...mapState('authentication', [
      'commerceID',
    ]),
    ...mapGetters('authentication', [
      'isAdminUser',
    ]),
  },
  methods: {
    ...mapActions('order', [
      'fetchOrders',
    ]),
    getStatus(empacado, sucursal) {
      if (!!empacado) {
        if (!!sucursal) {
          return 'Recibida';
        }
        return 'Despachada';
      }
      return 'PorDespachar';
    },
    getDate(date) {
      let d = new Date(date);
      let fecha = [d.getDate().toString(), (d.getMonth() + 1).toString(), d.getFullYear().toString()];
      fecha = fecha.map((num) => { return num.length === 1 ? '0' + num : num; });
      const formattedDate = fecha[0] + '/' + fecha[1] + '/' + fecha[2];
      return formattedDate;
    },
  },
};
</script>

<style>
.v-chip.Despachada{
  background: #5e8a25;
}
.v-chip.Recibida{
  background: #00BFFF;
}
.v-chip.PorDespachar{
  background: #DAA520;
}

</style>
