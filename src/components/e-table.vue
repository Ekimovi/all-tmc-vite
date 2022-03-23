<script setup>
import { ref, computed, } from "vue";
import { storeToRefs } from "pinia";
import { useTmcStore } from "../store/tmcStore";

const store = useTmcStore();

const { tmc, states, persons } = storeToRefs(store);
const optionsPersons = ref(Object.values(persons.value))

const filter = ref({})

const fullStates = computed(() => {
    const fullStates = states.value.map((st) => {
        const t = tmc.value[st.tmcId];
        const personMol = persons.value[st.mol].name;
        const personReal = persons.value[st.real].name;
        return { ...t, ...st, personMol, personReal }
    });
    return fullStates;
})

const filteredFullStates = computed(() => {
    let res = [...fullStates.value]
    for (const filterKey in filter.value) {
        if (filter.value[filterKey])
            res = res.filter(fs => fs[filterKey].match(new RegExp(filter.value[filterKey], 'i')))
    }
    return res
})

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
    { name: 'dateReciept', align: 'center', label: 'Дата поступления', field: 'dateReciept', sortable: true, format: val => new Date(val).toLocaleString() },
    { name: 'molType', align: 'center', label: 'T', field: 'molType', sortable: true },
    { name: 'mol', align: 'center', label: 'МОЛ', field: 'mol', sortable: true, format: (val, row) => row.personMol },
    { name: 'real', align: 'center', label: 'Выдано', field: 'personReal', sortable: true },
    { name: 'tagsState', align: 'center', label: 'Тэги позиции', field: 'tagsState', sortable: true },
]

</script>

<template>
    <q-table title :rows="filteredFullStates" :columns="columns" row-key="oebsId">
        <template v-slot:top-row>
            <q-tr>
                <q-td>
                    <q-input v-model="filter.oebsId" standout="bg-orange-9" clearable dense></q-input>
                </q-td>
                <q-td></q-td>
                <q-td></q-td>
                <q-td></q-td>
                <q-td></q-td>
                <q-td>
                    <q-input v-model="filter.personMol" standout="bg-orange-9" clearable dense></q-input>
                </q-td>
                <q-td>
                    <q-input v-model="filter.personReal" standout="bg-orange-9" clearable dense></q-input>
                </q-td>
                <q-td></q-td>
            </q-tr>
        </template>
        <template v-slot:body-cell-tagsTmc="props">
            <q-td :props="props">
                <span v-for="tag in props.value.split('#')">
                    <q-badge v-if="tag" color="grey-8" :label="tag" />
                </span>
                <q-popup-edit
                    v-model="tmc[props.row.oebsId].tags"
                    v-slot="scope"
                    buttons
                    label-set="Сохранить"
                >
                    <q-input v-model="scope.value" dense autofocus counter />
                </q-popup-edit>
            </q-td>
        </template>
        <template v-slot:body-cell-tagsState="props">
            <q-td :props="props">
                <span v-for="tag in props.value.split('#')">
                    <q-badge v-if="tag" color="grey-8" :label="tag" />
                </span>
                <q-popup-edit
                    v-model="states[props.row.idState].tagsState"
                    v-slot="scope"
                    buttons
                    label-set="Сохранить"
                >
                    <q-input v-model="scope.value" dense autofocus counter />
                </q-popup-edit>
            </q-td>
        </template>
        <template v-slot:body-cell-mol="props">
            <q-td :props="props" class="text-blue-10">
                {{ props.row.personMol }}
                <q-popup-edit
                    v-model="states[props.row.idState].mol"
                    v-slot="scope"
                    buttons
                    label-set="Сохранить"
                >
                    <q-select
                        v-model="scope.value"
                        :options="optionsPersons"
                        option-value="id"
                        option-label="name"
                        autofocus
                        emit-value
                        label="Сотрудник"
                        use-input
                        @filter="filterFn"
                        style="width: 300px"
                    >
                        <template v-slot:selected>
                            <q-chip
                                v-if="scope.value"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-my-none q-ml-xs q-mr-none"
                            >{{ persons[scope.value].name }}</q-chip>
                            <q-badge v-else>*none*</q-badge>
                        </template>
                    </q-select>
                </q-popup-edit>
            </q-td>
        </template>
        <template v-slot:body-cell-real="props">
            <q-td :props="props" class="text-blue-10">
                {{ props.row.personReal }}
                <q-popup-edit
                    v-model="states[props.row.idState].real"
                    v-slot="scope"
                    buttons
                    label-set="Сохранить"
                >
                    <q-select
                        v-model="scope.value"
                        :options="optionsPersons"
                        option-value="id"
                        option-label="name"
                        autofocus
                        emit-value
                        label="Сотрудник"
                        use-input
                        @filter="filterFn"
                        style="width: 300px"
                    >
                        <template v-slot:selected>
                            <q-chip
                                v-if="scope.value"
                                dense
                                square
                                color="white"
                                text-color="primary"
                                class="q-my-none q-ml-xs q-mr-none"
                            >{{ persons[scope.value].name }}</q-chip>
                            <q-badge v-else>*none*</q-badge>
                        </template>
                    </q-select>
                </q-popup-edit>
            </q-td>
        </template>
    </q-table>
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
