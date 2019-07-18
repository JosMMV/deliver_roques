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
        :items="desserts"
        :search="search"
        :rows-per-page-text="text"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        sort-icon="mdi-menu-down"
      >
        <template v-slot:items="props">
          <td>{{ props.item.tracking }}</td>
          <td class="text-xs-center">{{ props.item.client }}</td>
          <td class="text-xs-center">{{ props.item.sucursal }}</td>
          <td class="text-xs-center">
            <v-chip small :class="`${ props.item.status } white--text my-2 caption`">
              {{ props.item.status }}
            </v-chip>
          </td>
          <td class="text-xs-center">{{ props.item.cost }}</td>
          <td class="text-xs-center">{{ props.item.time }}</td>
          
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
  computed: {
    ...mapState('commerce', [
      'idCommerce',
    ]),
  },
  methods: {
    ...mapMutations('commerce', [
      'setIdCommerce',
    ]),
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
