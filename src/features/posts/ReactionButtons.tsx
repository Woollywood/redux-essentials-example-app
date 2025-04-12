import React from 'react'
import { Post, reactionAdded, Reactions, selectPostById } from './slice'
import { useAppDispatch, useAppSelector } from '@/hooks/store'

const reactionEmoji: Record<keyof Reactions, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

interface Props {
  id: string
}

export const ReactionButtons: React.FC<Props> = ({ id }) => {
  const post = useAppSelector((state) => selectPostById(state, id))
  const dispatch = useAppDispatch()

  if (!post) {
    return null
  }

  const { reactions } = post
  return (
    <div>
      {Object.entries(reactionEmoji).map(([stringName, emoji]) => {
        const reaction = stringName as keyof Reactions
        return (
          <button
            key={reaction}
            className="muted-button reaction-button"
            onClick={() => dispatch(reactionAdded({ postId: id, reaction }))}
          >
            {emoji} {reactions[reaction]}
          </button>
        )
      })}
    </div>
  )
}
