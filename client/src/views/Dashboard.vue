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
        :rows-per-page-text="text"
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
           <td class="text-xs-right">
              <v-icon>mdi-file-document-box-search-outline</v-icon>
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
      text: 'Filas a mostrar',
      headers: [
        {
          text: 'ID',
          align: 'center',
          value: 'id',
        },
        { text: 'Monto', value: 'amount', align: 'center' },
        { text: 'Fecha de emisión', value: 'dateCreation', align: 'center' },
        { text: 'Fecha tope', value: 'dateMaximum', align: 'center' },
        { text: 'Fecha de cancelación', value: 'dateCancel', align: 'center' },
        { text: 'Estatus', value: 'status', align: 'center' },
        { text: 'Ver factura', value: 'bill', align: 'center' },
      ],
      desserts: [
        {
          id: '1',
          amount: 159,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pendiente',
        },
        {
          id: '2',
          amount: 237,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pendiente',
        },
        {
          id: '3',
          amount: 262,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pendiente',
        },
        {
          id: '4',
          amount: 305,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '5',
          amount: 356,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '6',
          amount: 375,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '7',
          amount: 392,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '8',
          amount: 408,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '9',
          amount: 452,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
          status: 'Pagado',
        },
        {
          id: '10',
          amount: 518,
          dateCreation: '06/05/19',
          dateMaximum: '06/06/19',
          dateCancel: '06/06/19',
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
  padding-left: 6px;
  padding-right: 7px;
}
.v-chip.Pendiente{
  background: #bb2121;
}
</style>
