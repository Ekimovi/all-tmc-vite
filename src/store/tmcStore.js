import { defineStore } from "pinia";

export const useTmcStore = defineStore("tmc", {
  state: () => ({
    persons: {
      111111: {
        id: 111111,
        idPm: 102897346891,
        workGroup: "ELKS",
        name: "Манаков Д.М.",
        sex: "m",
        higth: 167,
        sizeCloth: "96-100",
        sizeShoe: 42,
        sizeHead: 60,
      },
      123450: {
        id: 123450,
        idPm: 102897346891,
        workGroup: "ELKS",
        name: "Иванов И.И.",
        sex: "m",
        higth: 167,
        sizeCloth: "96-100",
        sizeShoe: 42,
        sizeHead: 60,
      },
      123456: {
        id: 123456,
        idPm: 102897346891,
        workGroup: "ELKS",
        name: "Екимов И.М.",
        sex: "m",
        higth: 167,
        sizeCloth: "96-100",
        sizeShoe: 42,
        sizeHead: 60,
      },
    },
    tmc: {
      "1234.12344125.1234": {
        oebsId: "1234.12344125.1234",
        name: "Валенки",
        life: "2",
        tags: "одежда#зимняя",
      },
    },
    states: [
      {
        idState: 0,
        tmcId: "1234.12344125.1234",
        dateReciept: 1647489350035,
        molType: "7M1",
        mol: "123456",
        real: "111111",
        dateChange: 1647489350035,
        tagsState: "",
      },
      {
        idState: 1,
        tmcId: "1234.12344125.1234",
        dateReciept: 1647489350035,
        molType: "7M1",
        mol: "123456",
        real: "123456",
        dateChange: 1647489350035,
        tagsState: "",
      },
      {
        idState: 2,
        tmcId: "1234.12344125.1234",
        dateReciept: 1647489350035,
        molType: "7M1",
        mol: "123456",
        real: "123456",
        dateChange: 1647489350035,
        tagsState: "на списание#износ",
      },
    ],
  }),
  getters: {
    // tmcFull: (state) => {
    //   const tmcFull = state.states.map((st) => {
    //     const tmc = state.tmc[st.tmcId];
    //     const mol = state.persons[st.mol];
    //     const real = state.persons[st.real];
    //     return { tmc, state: st, persons: { mol, real } };
    //   });
    //   return tmcFull;
    // },
  },
  actions: {
    async getPersons() {
      const persons = await JSON.parse(localStorage.getItem("persons"));
      this.persons = persons;
    },
    savePersons() {
      const persons = JSON.stringify(this.persons);
      localStorage.setItem("persons", persons);
    },
    async getTmc() {
      const tmc = await JSON.parse(localStorage.getItem("tmc"));
      this.tmc = tmc;
    },
    saveTmc() {
      const tmc = JSON.stringify(this.tmc);
      localStorage.setItem("tmc", tmc);
    },
    async getStates() {
      const states = await JSON.parse(localStorage.getItem("states"));
      this.states = states;
    },
    saveStates() {
      const states = JSON.stringify(this.states);
      localStorage.setItem("states", states);
    },
  },
});
