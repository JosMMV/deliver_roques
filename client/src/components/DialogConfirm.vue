<template>
<v-dialog
  v-model="dialog"
  max-width="400"
>
  <v-card>
    <v-card-title class="headline">
      ¿Seguro que desea añadir el timestamp?
    </v-card-title>
    <v-card-text>
      Esta acción no podrá deshacerse.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        flat="flat"
        @click="$emit('OkClicked')"
      >
        Ok
      </v-btn>
      <v-btn
        color="green darken-1"
        flat="flat"
        @click="$emit('CancelClicked')"
      >
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
};
</script>
