/**
 * Получить числительное в правильном склонении
 * @param {number} number - Число
 * @param {string[]} variants - Варианты написания [минута, минуты, минут]
 * @returns {string} Вариант написания соответствующее переданному числу
 */
export function declOfNum(number, variants) {
  number = Math.abs(number);

  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    return variants[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  return variants[1];
}

/**
 * Debounce декоратор
 * @param {function} callback - Вызываемая функция
 * @param {number} wait - Время ожидания
 * @returns {function} Функция-обертка для запуска
 */
export default function debounce(callback, wait) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(context, args), wait);
  };
}
