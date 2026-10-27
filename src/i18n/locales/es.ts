import type { Translation } from './en'

const es: Translation = {
  app: {
    name: 'The Stock Bear 2',
  },
  tabs: {
    kitchen: 'Cocina',
    stock: 'Almacén',
    tasks: 'Tareas',
  },
  lists: {
    kitchenHint: 'Lo que falta en la cocina',
    stockHint: 'Qué sacar del almacén',
    tasksHint: 'Cosas por hacer',
    noLocation: 'Sin ubicación',
    empty: 'Nada aquí',
    allDone: 'Todo listo',
    left: 'faltan {{count}}',
  },
  item: {
    increase: 'Aumentar {{name}}',
    decrease: 'Disminuir {{name}}',
    complete: 'Marcar {{name}} como hecho',
    uncomplete: 'Marcar {{name}} como no hecho',
    picked: '{{picked}}/{{need}} sacados',
  },
  actions: {
    reset: 'Restablecer',
    resetConfirm: 'Toca otra vez',
    resetDone: 'Todo restablecido',
    settings: 'Ajustes',
    close: 'Cerrar',
  },
  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    moveDoneToEnd: 'Mover los hechos al final',
    moveDoneToEndHint: 'Si no, se quedan en su lugar',
    hand: 'Lado del botón de completar',
    handHint: 'Elige la mano con la que sostienes el móvil',
    left: 'Izquierda',
    right: 'Derecha',
    resetAll: 'Restablecer todas las listas',
    resetAllHint: 'Cocina, almacén y tareas vuelven al inicio',
  },
}

export default es
