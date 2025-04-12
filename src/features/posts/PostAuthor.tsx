import { useAppSelector } from '@/hooks/store'
import React from 'react'
import { selectUserById } from '../users'

interface Props {
  userId: string
}

export const PostAuthor: React.FC<Props> = ({ userId }) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author?.name ?? 'Unknown author'}</span>
}
