<template>
<v-container>
  <div class="mb-5">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          seleccionar
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="setItemSelected(index)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
  <v-layout row>
    <Report
      description="Solicitudes despachadas"
      sign=""
      :value="valuesSDByMonth"
      :labels="labelsSDByMonth"
    />
    <v-spacer></v-spacer>
    <Report
      description="Ventas"
      sign="€"
      :value="valuesVByMonth"
      :labels="labelsVByMonth"
    />
  </v-layout>
</v-container>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import Report from '../components/Report.vue';

export default {
  name: 'Reports',
  data: () => ({
    items: [
      { title: 'Por día' },
      { title: 'Por mes' },
      { title: 'Por año' },
      { title: 'Por Rango' },
    ],
  }),
  components: {
    Report,
  },
  computed: {
    ...mapState('report', [
      'valuesSDByMonth',
      'labelsSDByMonth',
      'valuesSDByYear',
      'labelsSDByYear',
      'valuesVByMonth',
      'labelsVByMonth',
      'valuesVByYear',
      'labelsVByYear',
      'itemSelected',
    ]),
  },
  methods: {
    ...mapMutations('report', [
      'setItemSelected',
    ]),
    ...mapActions('report', [
      '',
    ]),
  },
};
</script>
