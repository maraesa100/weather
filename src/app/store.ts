import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import MenuReducer from '../features/menu/menuSlice'

export const store = configureStore({
  reducer: {
    Menu: MenuReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
