<template>
<v-flex
  xs11
  sm5
  justify-center
  align-center
>
  <v-card
    class="mx-auto text-xs-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
          show-labels
          :labels="labels"
        >
          <template v-slot:label="item">
            {{ sign }}{{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">{{ description }}</div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn block flat>Generar Reporte</v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</template>

<script>
export default {
  props: [
    'description',
    'value',
    'labels',
    'sign',
  ],
};
</script>

<style>

</style>
