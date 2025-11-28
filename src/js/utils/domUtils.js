/**
 * Utilitários DOM
 */


export function selectElement(selector) {
  return document.querySelector(selector);
}

/**
 * Define HTML de um elemento
 */
export function setHTML(element, html) {
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * Obtém valor de um input
 */
export function getInputValue(input) {
  return input ? input.value : '';
}

/**
 * Adiciona event listener
 */
export function addEventListener(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
  }
}