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
          <td>{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.cedula_cliente }}</td>
          <td class="text-xs-center">{{ props.item.sucursal_id }}</td>
          <td class="text-xs-center">
            <v-chip
              small
              :class="`${ getStatus(props.item.empacado, props.item.sucursal) } white--text my-2 caption`"
            >
              {{ getStatus(props.item.empacado, props.item.sucursal) }}
            </v-chip>
          </td>
          <td class="text-xs-center">{{ props.item.costoEnvio }}</td>
          <td class="text-xs-center">{{ props.item.tiempoEnvio }}</td>
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
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  data() {
    return {
      search: '',
      text: 'Filas a mostrar',
      headers: [
        {
          text: 'Tracking',
          align: 'center',
          value: 'tracking',
        },
        { text: 'Cliente', value: 'client', align: 'center' },
        { text: 'Sucursal', value: 'sucursal', align: 'center' },
        { text: 'Estatus', value: 'status', align: 'center' },
        { text: 'Costo envío', value: 'cost', align: 'center' },
        { text: 'Tiempo envío', value: 'time', align: 'center' },
      ],


      desserts: [
        {
          tracking: '15454',
          client: 'José Medina',
          sucursal: 'Bolívar',
          status: 'Recibida',
          cost: '46,6 Bs',
          time: '5 días',
        },
        {
          tracking: '24345',
          client: 'José Medina',
          sucursal: 'Vargas',
          status: 'Recibida',
          cost: '50,0 Bs',
          time: '1 día',
        },
        {
          tracking: '33453',
          client: 'José Medina',
          sucursal: 'Nueva Esparta',
          status: 'Despachada',
          cost: '29,4 Bs',
          time: '5 días',
        },
        {
          tracking: '45433',
          client: 'Johanna Rojas',
          sucursal: 'Sucre',
          status: 'PorDespachar',
          cost: '70,0 Bs',
          time: '3 días',
        },
        {
          tracking: '52345',
          client: 'Johanna Rojas',
          sucursal: 'Zulia',
          status: 'PorDespachar',
          cost: '10.7 Bs',
          time: '6 días',
        },
      ],
    };
  },
  mounted() {
    this.fetchOrders();
  },
  computed: {
    ...mapState('commerce', [
      'idCommerce',
      'orders',
    ]),
  },
  methods: {
    ...mapMutations('commerce', [
      'setIdCommerce',
    ]),
    ...mapActions('commerce', [
      'fetchOrders',
    ]),
    getStatus(empacado, sucursal) {
      if (empacado) {
        if (sucursal) {
          return 'Recibida';
        }
        return 'Despachada';
      }
      return 'PorDespachar';
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
