const en = {
  app: {
    name: 'The Stock Bear 2',
  },
  tabs: {
    kitchen: 'Kitchen',
    stock: 'Stock',
    tasks: 'Tasks',
  },
  lists: {
    kitchenHint: 'What is missing in the kitchen',
    stockHint: 'What to grab from stock',
    tasksHint: 'Things to do',
    noLocation: 'No location',
    empty: 'Nothing here',
    allDone: 'All done',
    left: '{{count}} left',
  },
  item: {
    increase: 'Increase {{name}}',
    decrease: 'Decrease {{name}}',
    complete: 'Mark {{name}} as done',
    uncomplete: 'Mark {{name}} as not done',
    picked: '{{picked}}/{{need}} picked',
  },
  actions: {
    reset: 'Reset',
    resetConfirm: 'Tap again',
    resetDone: 'Everything restored',
    settings: 'Settings',
    close: 'Close',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    moveDoneToEnd: 'Move done items to the end',
    moveDoneToEndHint: 'Otherwise they stay in place',
    hand: 'Check button side',
    handHint: 'Pick the hand you hold the phone with',
    left: 'Left',
    right: 'Right',
    resetAll: 'Restore all lists',
    resetAllHint: 'Kitchen, stock and tasks back to the start',
  },
}

export type Translation = typeof en

export default en
