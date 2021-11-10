<template>
  <div id="app">
    <ValidationObserver
      ref="validator"
      class="container"
      #default="{ handleSubmit }"
    >
      <form class="form" @submit.prevent="handleSubmit(submit)">
        <div class="form__unit">
          <h2 class="form__group-title">Личные данные</h2>
          <PersonForm
            :f-name.sync="model.fName"
            :l-name.sync="model.lName"
            :m-name.sync="model.mName"
            :birthday.sync="model.birthday"
            :email.sync="model.email"
            :gender.sync="model.gender"
          />
        </div>

        <div class="form__unit">
          <h2 class="form__group-title">Паспортные данные</h2>
          <CitizenshipForm
            :citizenship.sync="model.citizenship"
            :citizenship-options="citizenshipFilteredOptions"
            @citizenship-search-request="_filterCitizenshipOptions($event)"
          />

          <RussianPassportForm
            v-if="isRussianCitizenship"
            :series.sync="model.passport.series"
            :number.sync="model.passport.number"
            :issue-date.sync="model.passport.issueDate"
          />

          <template v-else>
            <LatinFullNameForm
              :f-name.sync="model.latinFName"
              :l-name.sync="model.latinLName"
            />

            <ForeignPassportForm
              :number.sync="model.foreignPassport.number"
              :country.sync="model.foreignPassport.country"
              :type.sync="model.foreignPassport.type"
              :country-options="citizenshipOptions"
              :type-options="passportTypeOptions"
            />
          </template>

          <PreviousFullNameForm
            :name-changed.sync="model.nameChanged"
            :f-name.sync="model.prevFName"
            :l-name.sync="model.prevLName"
          />
        </div>

        <div class="form__submit-row form__unit">
          <UiButton label="Отправить" type="submit" />
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import CitizenshipForm from "./components/forms/CitizenshipForm";
import ForeignPassportForm from "./components/forms/ForeignPassportForm";
import LatinFullNameForm from "./components/forms/LatinFullNameForm";
import PersonForm from "./components/forms/PersonForm";
import PreviousFullNameForm from "./components/forms/PreviousFullNameForm";
import RussianPassportForm from "./components/forms/RussianPassportForm";
import UiButton from "./components/ui/UiButton";
import ValidationObserver from "./components/form-validation/ValidationObserver";

import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";
import debounce from "@/utils/helpers";

const RUSSIAN_CITIZENSHIP_UID = "0e10e8fe-cb2f-42d0-b86a-e38cb4e01f40";

const initModel = () => ({
  fName: null,
  lName: null,
  mName: null,
  birthday: null,
  email: null,
  gender: "male",
  citizenship: null,
  passport: {
    series: null,
    number: null,
    issueDate: null,
  },
  foreignPassport: {
    number: null,
    country: null,
    type: null,
  },
  latinFName: null,
  latinLName: null,
  nameChanged: false,
  prevFName: null,
  prevLName: null,
});

export default {
  name: "App",
  components: {
    CitizenshipForm,
    ForeignPassportForm,
    LatinFullNameForm,
    PersonForm,
    PreviousFullNameForm,
    RussianPassportForm,
    UiButton,
    ValidationObserver,
  },
  data() {
    return {
      citizenshipSearchQuery: "",
      model: initModel(),
    };
  },
  computed: {
    isRussianCitizenship() {
      return this.model.citizenship === RUSSIAN_CITIZENSHIP_UID;
    },
    citizenshipOptions() {
      return citizenships.map(({ nationality, uid }) => ({
        label: nationality,
        value: uid,
      }));
    },
    citizenshipFilteredOptions() {
      const searchQuery = this.citizenshipSearchQuery.toLowerCase();

      if (!searchQuery) return this.citizenshipOptions;
      return this.citizenshipOptions.filter(({ label }) =>
        label.toLowerCase().includes(searchQuery)
      );
    },
    passportTypeOptions() {
      return passportTypes.map((item) => ({
        label: item.type,
        value: item.id,
      }));
    },
  },
  created() {
    this._setCitizenshipInitialValue();
  },
  methods: {
    _setCitizenshipInitialValue() {
      this.model.citizenship = this.citizenshipOptions[0].value;
    },
    _filterCitizenshipOptions: debounce(function (value) {
      this.citizenshipSearchQuery = value;
    }, 500),

    reset() {
      this.model = initModel();
      this._setCitizenshipInitialValue();
      this.$refs.validator.reset();
    },
    submit() {
      console.log(JSON.stringify(this.model));
      this.reset();
    },
  },
};
</script>

<style>
#app {
  --white-hsl: 0deg, 0%, 100%;
  --silver-hsl: 218deg, 17%, 88%;
  --gray-hsl: 218deg, 17%, 68%;
  --gray-dark-hsl: 218deg, 17%, 58%;
  --primary-hsl: 219deg, 100%, 50%;
  --primary-light-hsl: 219deg, 100%, 60%;
  --primary-dark-hsl: 219deg, 100%, 46%;
  --primary-extra-dark-hsl: 219deg, 100%, 42%;
  --danger-hsl: 359deg, 99%, 71%;
  --gutter: 1rem;
  --field-padding-x: 0.75rem;
  --dropdown-zindex: 100;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
}

.drop-up-enter-active,
.drop-up-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transform-origin: center top;
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.drop-up-enter,
.drop-up-leave-active {
  opacity: 0;
  transform: scaleY(0);
}

.form__unit:nth-child(1n + 2) {
  margin-top: 3rem;
}

.form__submit-row {
  display: flex;
  justify-content: flex-end;
}
</style>
