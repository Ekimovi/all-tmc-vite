<script setup>
import { ref, computed, } from "vue";
import { storeToRefs } from "pinia";
import { useTmcStore } from "../store/tmcStore";

const showDialog = ref(false)

const store = useTmcStore();

const { tmc, states, persons } = storeToRefs(store);
const optionsPersons = ref(Object.values(persons.value))

const newStates = ref([{
    oebsId: "",
    name: "asdfsadf",
    life: "",
    tags: "",
    molType: "",
    mol: "",
    real: "",
    tagsState: "",
}])

const filterFn = (val, update,) => {
    update(
        () => {
            if (val === '') {
                optionsPersons.value = Object.values(persons.value)
            }
            else {
                const needle = val.toLowerCase()
                optionsPersons.value = Object.values(persons.value).filter(p => p.name.toLowerCase().indexOf(needle) > -1)
            }
        },

        // "ref" is the Vue reference to the QSelect
        ref => {
            if (val !== '' && ref.options.length > 0) {
                ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
        }
    )
}
const columns = [
    { name: 'oebsId', align: 'center', label: '# OEBS', field: 'oebsId', sortable: true },
    { name: 'name', align: 'center', label: 'Наименование', field: 'name', sortable: true },
    { name: 'tagsTmc', align: 'center', label: 'Теги оборудования', field: 'tags', sortable: true },
    { name: 'molType', align: 'center', label: 'T', field: 'molType', sortable: true },
    { name: 'mol', align: 'center', label: 'МОЛ', field: 'mol', sortable: true, format: (val, row) => row.personMol },
    { name: 'real', align: 'center', label: 'Выдано', field: 'personReal', sortable: true },
    { name: 'tagsState', align: 'center', label: 'Тэги позиции', field: 'tagsState', sortable: true },
]

</script>

<template>
    <q-btn color="primary" @click="showDialog = true">Добавить</q-btn>
    <q-dialog
        v-model="showDialog"
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card>
            <q-bar>
                <q-space />

                <q-btn flat icon="close" v-close-popup></q-btn>
            </q-bar>
            <q-table title :rows="newStates" :columns="columns" hide-pagination>
                <template v-slot:body-cell="props">
                    <q-td>
                        <!-- {{ props }} -->
                        <q-input v-model="props.row[props.col.field]" standout="bg-blue-9" dense />
                    </q-td>
                </template>
            </q-table>
        </q-card>
    </q-dialog>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
}
.conteiner {
    display: flex;
    flex-direction: column;
}
.col-2,
.col-6,
.col-3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
}
</style>
