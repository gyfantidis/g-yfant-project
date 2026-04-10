"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";

export type AppId =
  | "about"
  | "projects"
  | "terminal"
  | "blog"
  | "skills"
  | "contact"
  | "certifications";

export const APP_IDS: AppId[] = [
  "about",
  "projects",
  "terminal",
  "blog",
  "skills",
  "contact",
  "certifications",
];

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

type WindowsState = Record<AppId, WindowState>;

type Action =
  | { type: "OPEN"; id: AppId }
  | { type: "CLOSE"; id: AppId }
  | { type: "MINIMIZE"; id: AppId }
  | { type: "FOCUS"; id: AppId }
  | { type: "TOGGLE"; id: AppId };

const initialState: WindowsState = Object.fromEntries(
  APP_IDS.map((id) => [id, { isOpen: false, isMinimized: false, zIndex: 1 }])
) as WindowsState;

let zCounter = 10;

function reducer(state: WindowsState, action: Action): WindowsState {
  switch (action.type) {
    case "OPEN": {
      zCounter++;
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isOpen: true,
          isMinimized: false,
          zIndex: zCounter,
        },
      };
    }
    case "CLOSE":
      return { ...state, [action.id]: { ...state[action.id], isOpen: false } };
    case "MINIMIZE":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isMinimized: !state[action.id].isMinimized,
        },
      };
    case "FOCUS": {
      zCounter++;
      return {
        ...state,
        [action.id]: { ...state[action.id], zIndex: zCounter },
      };
    }
    case "TOGGLE": {
      if (state[action.id].isOpen && !state[action.id].isMinimized) {
        return {
          ...state,
          [action.id]: { ...state[action.id], isOpen: false },
        };
      }
      zCounter++;
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          isOpen: true,
          isMinimized: false,
          zIndex: zCounter,
        },
      };
    }
    default:
      return state;
  }
}

interface WindowManagerContextType {
  windows: WindowsState;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleWindow: (id: AppId) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, dispatch] = useReducer(reducer, initialState);

  const openWindow = useCallback(
    (id: AppId) => dispatch({ type: "OPEN", id }),
    []
  );
  const closeWindow = useCallback(
    (id: AppId) => dispatch({ type: "CLOSE", id }),
    []
  );
  const minimizeWindow = useCallback(
    (id: AppId) => dispatch({ type: "MINIMIZE", id }),
    []
  );
  const focusWindow = useCallback(
    (id: AppId) => dispatch({ type: "FOCUS", id }),
    []
  );
  const toggleWindow = useCallback(
    (id: AppId) => dispatch({ type: "TOGGLE", id }),
    []
  );

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleWindow,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx)
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
