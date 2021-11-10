import { required, email, digits } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

import { declOfNum } from "@/utils/helpers";

extend("email", {
  ...email,
  message: "Введите корректный email",
});
//
extend("required", {
  ...required,
  message: "Поле обязательно к заполнению",
});

extend("сyrillic", {
  validate(value) {
    const regexp = /^[\u0400-\u04FF]+$/;

    return regexp.test(value);
  },
  message: "Доступны только кириллические символы",
});

extend("latin", {
  validate(value) {
    const regexp = /^[a-zA-Z]+$/;

    return regexp.test(value);
  },
  message: "Доступны только латинские символы",
});

extend("past-date", {
  params: ["limit"],
  validate(dateStr) {
    if (!dateStr) return false;

    const UTCdate = new Date(dateStr).setHours(0, 0, 0, 0);
    const UTCtoday = new Date().setHours(0, 0, 0, 0);

    return UTCdate <= UTCtoday;
  },
  message: "Некорректная дата",
});

extend("digits", {
  ...digits,
  message: (_, { length }) => {
    const wordCases = ["цифра", "цифры", "цифр"];

    return `Должно быть ${length} ${declOfNum(length, wordCases)}`;
  },
});
