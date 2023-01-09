import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import * as api from "../config";
import { rootReducer } from "./rootReducer";

import {
  composeWithDevTools,
  devToolsEnhancer,
} from "@redux-devtools/extension";
import thunk from "redux-thunk";

import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

// const persistConfig = {
//   key: "persistedStore",
//   storage,
//   // whitelist: ["countries", "theme"],
//   // blacklist: []
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk.withExtraArgument({ client: axios, api }))
//   )
// );

export const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument({ client: axios, api }))
    )
  );
  store.subscribe(
    throttle(() => {
      saveState({
        theme: store.getState().theme,
        countries: store.getState().countries.list,
        controls: store.getState().controls,
        country: store.getState().country,
      });
    }, 1000)
  );
  return store;
};

export const persistor = persistStore(configureStore());
