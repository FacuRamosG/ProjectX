import { type Post } from '../types/post'
import PostCard from './post-card'

export function PostList ({ posts, singinId }: { posts: Post[] | null, singinId: string | null }) {
  let userName: string
  let name: string | null
  let avatarUrl: string
  return (
        <>
            {
          posts?.map(post => {
            const {
              id,
              content,
              user,
              user_id: userId
            } = post

            if (user !== null) {
              const {
                user_name: extractedUserName,
                name: extractedName,
                avatar_url: extractedAvatarUrl
              } = user

              userName = extractedUserName
              avatarUrl = extractedAvatarUrl
              if (extractedName !== null) {
                name = extractedName
              } else {
                name = ''
              }
            }

            return (
              <PostCard
                key={id}
                userName={userName}
                userFullName={name}
                avatarUrl={avatarUrl}
                content={content}
                sameUser={singinId === userId}
                id={id}
                userId={userId}

              />
            )
          })
        }
        </>
  )
}
