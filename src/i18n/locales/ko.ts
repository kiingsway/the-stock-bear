import type { Translation } from './en'

const ko: Translation = {
  app: {
    name: 'The Stock Bear 2',
  },
  tabs: {
    kitchen: '주방',
    stock: '창고',
    tasks: '할 일',
  },
  lists: {
    kitchenHint: '주방에 부족한 것',
    stockHint: '창고에서 가져올 것',
    tasksHint: '해야 할 일',
    noLocation: '위치 없음',
    empty: '항목 없음',
    allDone: '모두 완료',
    left: '{{count}}개 남음',
  },
  item: {
    increase: '{{name}} 늘리기',
    decrease: '{{name}} 줄이기',
    complete: '{{name}} 완료로 표시',
    uncomplete: '{{name}} 미완료로 표시',
    picked: '{{picked}}/{{need}} 가져옴',
  },
  actions: {
    reset: '초기화',
    resetConfirm: '한 번 더 누르기',
    resetDone: '모두 초기화됨',
    settings: '설정',
    close: '닫기',
  },
  settings: {
    title: '설정',
    language: '언어',
    moveDoneToEnd: '완료한 항목을 끝으로 이동',
    moveDoneToEndHint: '끄면 제자리에 남아요',
    hand: '완료 버튼 위치',
    handHint: '휴대폰을 잡는 손을 고르세요',
    left: '왼쪽',
    right: '오른쪽',
    resetAll: '모든 목록 초기화',
    resetAllHint: '주방, 창고, 할 일을 처음 상태로',
  },
}

export default ko
