import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { userLoggedOut } from '../auth'

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

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialState: Post[] = [
  {
    id: '1',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    reactions: initialReactions,
  },
  {
    id: '2',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: 'Second Post',
    content: 'More text',
    reactions: initialReactions,
  },
]

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, { payload }: PayloadAction<Post>) => {
        state.push(payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: initialReactions,
          },
        }
      },
    },
    postUpdated: (state, { payload: { id, title, content } }: PayloadAction<PostUpdate>) => {
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (
      state,
      { payload: { postId, reaction } }: PayloadAction<{ postId: string; reaction: keyof Reactions }>,
    ) => {
      const existingPost = state.find(({ id }) => id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => [])
  },
  selectors: {
    selectAllPosts: (state) => state,
    selectPostById: (state, postId: string) => state.find(({ id }) => id === postId),
  },
})

export const { selectAllPosts, selectPostById } = slice.selectors
export const { postAdded, postUpdated, reactionAdded } = slice.actions
export default slice.reducer
