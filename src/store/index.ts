import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import adminStaffAuthReducer from './slices/adminStaffAuthSlice'
import reportsReducer from './slices/reportsSlice'
import uiReducer from './slices/uiSlice'
import analyticsReducer from './slices/analyticsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminStaffAuth: adminStaffAuthReducer,
    reports: reportsReducer,
    ui: uiReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
