import { MenuActions, SET_IS_OPEN, SET_SELECTED_TAB, Tabs } from "../types";

export const setIsOpen = (isOpen?: boolean): MenuActions => ({
  type: SET_IS_OPEN,
  isOpen
});

export const setSelectedTab = (tab: Tabs): MenuActions => ({
  type: SET_SELECTED_TAB,
  tab
});
