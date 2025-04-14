import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '.'
import { addPostsListeners } from '@/features/posts'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()
export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
export type AppListener = typeof addAppListener

addPostsListeners(startAppListening)
