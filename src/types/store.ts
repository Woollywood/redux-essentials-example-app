export interface AsyncState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}
