import { DockActionTypes, dockReducer, initialState } from "./useDocks";

describe("teste", () => {
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
