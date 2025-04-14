import { createSlice, PayloadAction, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { AsyncStateEntity } from '@/types/store'
import { createAppAsyncThunk } from '@/hooks/store'
import { client } from '@/api/client'
import { logout } from '../auth'
import { RootState } from '@/store'
import { AppStartListening } from '@/store/listenerMiddleware'

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export interface Post {
  id: string
  user: string
  date: string
  title: string
  content: string
  reactions: Reactions
}

export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export type NewPost = Pick<Post, 'title' | 'content' | 'user'>

type StoreState = AsyncStateEntity<Post, string>

const adapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState: StoreState = adapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await client.get<Post[]>('/fakeApi/posts')
  return data
})

export const createNewPost = createAppAsyncThunk('posts/createNewPost', async (initialPost: NewPost) => {
  const { data } = await client.post<Post>('/fakeApi/posts', initialPost)
  return data
})

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, { payload: { id, title, content } }: PayloadAction<PostUpdate>) => {
      adapter.updateOne(state, { id, changes: { title, content } })
    },
    reactionAdded: (
      state,
      { payload: { postId, reaction } }: PayloadAction<{ postId: string; reaction: keyof Reactions }>,
    ) => {
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.error = null
        adapter.setAll(state, payload)
      })
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'Unknown error'
      })
      .addCase(createNewPost.fulfilled, adapter.addOne)
  },
})

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: createNewPost.fulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post created!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true,
      })

      await listenerApi.delay(5000)
      toast.remove(toastId)
    },
  })
}

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = adapter.getSelectors((state: RootState) => state.posts)
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter(({ user }) => user === userId),
)
export const selectPostsIdsByUser = createSelector([selectPostsByUser], (posts) => posts.map(({ id }) => id))
export const { postUpdated, reactionAdded } = slice.actions
export default slice.reducer
