import { DockActionTypes, dockReducer, initialState } from "./State/useDocks";

describe("adding / removing itens", () => {
  it("should add docks", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    expect(state.dockOrder.length).toBe(1);
    expect(Object.keys(state.docks).length).toBe(1);
    const id = Object.values(state.docks)[0].id;
    expect(state.docks[id].id).toBe(id);
    state = dockReducer(state, { type: DockActionTypes.addDock });
    expect(state.dockOrder.length).toBe(2);
    expect(Object.keys(state.docks).length).toBe(2);
  });

  it("should add cards", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    const dockId = Object.values(state.docks)[0].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });
    expect(Object.values(state.cards).length).toBe(1);
    const cardId = Object.values(state.cards)[0].id;
    expect(state.cards[cardId].id).toBe(cardId);
  });
});

describe("moving cards", () => {
  test("should move downwards on the same dock", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    const dockId = Object.values(state.docks)[0].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });

    const firstCardId = state.docks[dockId].cardOrder[0];
    const secondCardId = state.docks[dockId].cardOrder[1];

    state = dockReducer(state, { type: DockActionTypes.dragCardStart, id: firstCardId, dockId: dockId, index: 0 });
    state = dockReducer(state, {
      type: DockActionTypes.dragCardHover,
      id: secondCardId,
      dockId: dockId,
      index: state.docks[dockId].cardOrder.findIndex((id) => id === secondCardId),
    });
    state = dockReducer(state, { type: DockActionTypes.dragCardEnd });

    expect(state.docks[dockId].cardOrder.length).toBe(2);
    expect(state.docks[dockId].cardOrder[0]).toBe(secondCardId);
    expect(state.docks[dockId].cardOrder[1]).toBe(firstCardId);
  });
  test("should move upwards on the same dock", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    const dockId = Object.values(state.docks)[0].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });

    const firstCardId = state.docks[dockId].cardOrder[0];
    const secondCardId = state.docks[dockId].cardOrder[1];

    state = dockReducer(state, { type: DockActionTypes.dragCardStart, id: secondCardId, dockId: dockId, index: 1 });
    state = dockReducer(state, { type: DockActionTypes.dragCardHover, id: firstCardId, dockId: dockId, index: 0 });
    state = dockReducer(state, { type: DockActionTypes.dragCardEnd });

    expect(state.docks[dockId].cardOrder[0]).toBe(secondCardId);
    expect(state.docks[dockId].cardOrder[1]).toBe(firstCardId);
  });
  test("should move between docks", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    state = dockReducer(state, { type: DockActionTypes.addDock });
    expect(Object.values(state.docks).length).toBe(2);
    const dockId1 = Object.values(state.docks)[0].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId1 });
    const dockId2 = Object.values(state.docks)[1].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId2 });

    const firstCardId = state.docks[dockId1].cardOrder[0];
    const secondCardId = state.docks[dockId2].cardOrder[0];

    state = dockReducer(state, { type: DockActionTypes.dragCardStart, id: firstCardId, dockId: dockId1, index: 0 });
    state = dockReducer(state, { type: DockActionTypes.dragCardHover, id: secondCardId, dockId: dockId2, index: 0 });
    state = dockReducer(state, { type: DockActionTypes.dragCardEnd });

    expect(state.docks[dockId1].cardOrder.length).toBe(0);
    expect(state.docks[dockId2].cardOrder.length).toBe(2);
    expect(state.docks[dockId1].cardOrder.find((id) => id === firstCardId)).toBeTruthy;
    expect(state.docks[dockId1].cardOrder.find((id) => id === secondCardId)).toBeTruthy;
  });

  test("Moving up and down changes nothing", () => {
    let state = dockReducer(initialState, { type: DockActionTypes.addDock });
    const dockId = Object.values(state.docks)[0].id;
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });
    state = dockReducer(state, { type: DockActionTypes.addCard, dockId: dockId });

    const firstCardId = state.docks[dockId].cardOrder[0];
    const secondCardId = state.docks[dockId].cardOrder[1];

    state = dockReducer(state, { type: DockActionTypes.dragCardStart, id: firstCardId, dockId: dockId, index: 0 });
    state = dockReducer(state, { type: DockActionTypes.dragCardHover, id: secondCardId, dockId: dockId, index: 1 });
    state = dockReducer(state, { type: DockActionTypes.dragCardHover, id: secondCardId, dockId: dockId, index: 0 });
    state = dockReducer(state, { type: DockActionTypes.dragCardEnd });

    expect(state.docks[dockId].cardOrder[0]).toBe(firstCardId);
    expect(state.docks[dockId].cardOrder[1]).toBe(secondCardId);
  });
});
