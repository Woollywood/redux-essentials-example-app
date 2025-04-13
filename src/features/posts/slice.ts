import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { userLoggedOut } from '../auth'
import { AsyncState } from '@/types/store'
import { createAppAsyncThunk } from '@/hooks/store'
import { client } from '@/api/client'

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

interface StoreState extends AsyncState {
  posts: Post[]
}

const initialState: StoreState = {
  posts: [],
  status: 'idle',
  error: null,
}

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
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (
      state,
      { payload: { postId, reaction } }: PayloadAction<{ postId: string; reaction: keyof Reactions }>,
    ) => {
      const existingPost = state.posts.find(({ id }) => id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, () => initialState)
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.error = null
        state.posts = payload
      })
      .addCase(fetchPosts.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error.message ?? 'Unknown error'
      })
      .addCase(createNewPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload)
      })
  },
  selectors: {
    selectAllPosts: (state) => state.posts,
    selectPostById: (state, postId: string) => state.posts.find(({ id }) => id === postId),
  },
})

export const { selectAllPosts, selectPostById } = slice.selectors
export const { postUpdated, reactionAdded } = slice.actions
export default slice.reducer
