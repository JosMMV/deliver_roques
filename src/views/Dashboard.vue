<template>
  <v-container>
    <v-card>
      <v-card-title>
        Facturas
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar factura"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        sort-icon="mdi-menu-down"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.dateCreation }}</td>
          <td class="text-xs-right">{{ props.item.dateMaximum }}</td>
          <td class="text-xs-right">{{ props.item.dateCancel }}</td>
          <td class="text-xs-right">
            <v-chip small :class="`${ props.item.status } white--text my-2 caption`">
              {{ props.item.status }}
            </v-chip>
          </td>
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
      headers: [
        {
          text: 'ID de factura',
          align: 'center',
          value: 'id',
        },
        { text: 'Monto', value: 'amount', align: 'center' },
        { text: 'Fecha de emisión', value: 'dateCreation', align: 'center' },
        { text: 'Fecha tope', value: 'dateMaximum', align: 'center' },
        { text: 'Fecha de cancelación', value: 'dateCancel', align: 'center' },
        { text: 'Estatus', value: 'status', align: 'center' },
      ],
      desserts: [
        {
          id: 'Frozen Yogurt',
          amount: 159,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 4.0,
          status: 'Pendiente',
        },
        {
          id: 'Ice cream sandwich',
          amount: 237,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 4.3,
          status: 'Pendiente',
        },
        {
          id: 'Eclair',
          amount: 262,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 6.0,
          status: 'Pendiente',
        },
        {
          id: 'Cupcake',
          amount: 305,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 4.3,
          status: 'Pagado',
        },
        {
          id: 'Gingerbread',
          amount: 356,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 3.9,
          status: 'Pagado',
        },
        {
          id: 'Jelly bean',
          amount: 375,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 0.0,
          status: 'Pagado',
        },
        {
          id: 'Lollipop',
          amount: 392,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 0,
          status: 'Pagado',
        },
        {
          id: 'Honeycomb',
          amount: 408,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 6.5,
          status: 'Pagado',
        },
        {
          id: 'Donut',
          amount: 452,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 4.9,
          status: 'Pagado',
        },
        {
          id: 'KitKat',
          amount: 518,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: 7,
          status: 'Pagado',
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
.v-chip.Pagado{
  background: #5e8a25;
}
.v-chip.Pendiente{
  background: #bb2121;
}
</style>
