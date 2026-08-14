"use client";
import { Store } from "@tanstack/store";
// import { IBasketRoot } from "./types/IBasket";

export interface Istore {
  modals: React.ReactNode[]
}

export const store = new Store({
  modals: [],
} as Istore);

export const addModal = (modal: React.ReactNode) => {
  store.setState((state) => ({
    ...state,
    modals: [...state.modals, modal]
  }));
};

export const removeLastModal = () => {
  store.setState((_state) => {
    let state = JSON.parse(JSON.stringify(_state))
    state.modals.splice(state.modals.length - 1, 1)
    return state
  });
};
