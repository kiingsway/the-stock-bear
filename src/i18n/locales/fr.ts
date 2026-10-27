import type { Translation } from './en'

const fr: Translation = {
  app: {
    name: 'The Stock Bear 2',
  },
  tabs: {
    kitchen: 'Cuisine',
    stock: 'Réserve',
    tasks: 'Tâches',
  },
  lists: {
    kitchenHint: 'Ce qui manque en cuisine',
    stockHint: 'Ce qu’il faut prendre en réserve',
    tasksHint: 'Choses à faire',
    noLocation: 'Sans emplacement',
    empty: 'Rien ici',
    allDone: 'Tout est fait',
    left: 'reste {{count}}',
  },
  item: {
    increase: 'Augmenter {{name}}',
    decrease: 'Diminuer {{name}}',
    complete: 'Marquer {{name}} comme fait',
    uncomplete: 'Marquer {{name}} comme non fait',
    picked: '{{picked}}/{{need}} pris',
  },
  actions: {
    reset: 'Réinitialiser',
    resetConfirm: 'Touchez encore',
    resetDone: 'Tout est réinitialisé',
    settings: 'Réglages',
    close: 'Fermer',
  },
  settings: {
    title: 'Réglages',
    language: 'Langue',
    moveDoneToEnd: 'Déplacer les éléments faits à la fin',
    moveDoneToEndHint: 'Sinon ils restent à leur place',
    hand: 'Côté du bouton valider',
    handHint: 'Choisissez la main qui tient le téléphone',
    left: 'Gauche',
    right: 'Droite',
    resetAll: 'Réinitialiser toutes les listes',
    resetAllHint: 'Cuisine, réserve et tâches reviennent au début',
  },
}

export default fr
