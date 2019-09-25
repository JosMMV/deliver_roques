<template>
  <v-container>
    <v-card>
      <v-card-title>
        Facturas
        <v-spacer></v-spacer>
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
        :items="bills"
        :search="search"
        :rows-per-page-text="text"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        sort-icon="mdi-menu-down"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.created_at }}</td>
          <td class="text-xs-right">{{ props.item.topDate }}</td>
          <td class="text-xs-right">{{ props.item.payingDate }}</td>
          <td class="text-xs-right">
            <v-chip small :class="`${ props.item.status } white--text my-2 caption`">
              {{ props.item.status }}
            </v-chip>
          </td>
          <td class="text-xs-right">
            <v-icon>mdi-file-document-box-search-outline</v-icon>
          </td>
          <td class="text-xs-right" v-if="isAdminUser">{{ props.item.comercio }}</td>
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
  mapGetters,
  mapActions,
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
        { text: 'Fecha de emisión', value: 'created_at', align: 'center' },
        { text: 'Fecha tope', value: 'topDate', align: 'center' },
        { text: 'Fecha de cancelación', value: 'dateCancel', align: 'center' },
        { text: 'Estatus', value: 'status', align: 'center' },
        { text: 'Ver factura', value: 'bill', align: 'center' },
      ],
    };
  },
  mounted() {
    this.fetchBills({ isAdminUser: this.isAdminUser, commerceID: this.commerceID });
  },
  computed: {
    ...mapState('authentication', [
      'commerceID',
      'commerceName',
    ]),
    ...mapState('bill', [
      'bills',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isAdminUser',
    ]),
  },
  methods: {
    ...mapMutations('commerce', [
      'setIdCommerce',
    ]),
    ...mapActions('bill', [
      'fetchBills',
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
