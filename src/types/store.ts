import { EntityId, EntityState } from '@reduxjs/toolkit'

export interface AsyncState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export type AsyncStateEntity<T, Id extends EntityId> = AsyncState & EntityState<T, Id>
