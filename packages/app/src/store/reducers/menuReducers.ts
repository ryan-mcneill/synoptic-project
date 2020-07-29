import {
  MenuActions,
  MenuState,
  SET_IS_OPEN,
  SET_SELECTED_TAB
} from "../types";

const initialState: MenuState = {
  isOpen: false,
  selectedTab: "PLAYLIST"
};

export const menu = (
  state: MenuState = initialState,
  action: MenuActions
) => {
  switch (action.type) {
    case SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.isOpen ? action.isOpen : !state.isOpen
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.tab
      };
    default: {
      return state;
    }
  }
};
