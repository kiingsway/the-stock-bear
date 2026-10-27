import type { Translation } from './en'

const pt: Translation = {
  app: {
    name: 'The Stock Bear 2',
  },
  tabs: {
    kitchen: 'Cozinha',
    stock: 'Estoque',
    tasks: 'Tarefas',
  },
  lists: {
    kitchenHint: 'O que falta na cozinha',
    stockHint: 'O que pegar no estoque',
    tasksHint: 'Coisas a fazer',
    noLocation: 'Sem local',
    empty: 'Nada aqui',
    allDone: 'Tudo feito',
    left: 'faltam {{count}}',
  },
  item: {
    increase: 'Aumentar {{name}}',
    decrease: 'Diminuir {{name}}',
    complete: 'Marcar {{name}} como feito',
    uncomplete: 'Marcar {{name}} como não feito',
    picked: '{{picked}}/{{need}} pegos',
  },
  actions: {
    reset: 'Restaurar',
    resetConfirm: 'Toque de novo',
    resetDone: 'Tudo restaurado',
    settings: 'Configurações',
    close: 'Fechar',
  },
  settings: {
    title: 'Configurações',
    language: 'Idioma',
    moveDoneToEnd: 'Mover itens feitos para o final',
    moveDoneToEndHint: 'Senão eles ficam no lugar',
    hand: 'Lado do botão de concluir',
    handHint: 'Escolha a mão que segura o celular',
    left: 'Esquerda',
    right: 'Direita',
    resetAll: 'Restaurar todas as listas',
    resetAllHint: 'Cozinha, estoque e tarefas voltam ao início',
  },
}

export default pt
