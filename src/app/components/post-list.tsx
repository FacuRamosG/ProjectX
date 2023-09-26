import { type Post } from '../types/post'
import PostCard from './post-card'

export function PostList ({ posts, singinId }: { posts: Post[] | null, singinId: string | null }) {
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

            const {
              user_name: userName,
              name: userFullName,
              avatar_url: avatarUrl
            } = user

            return (
              <PostCard
                key={id}
                userName={userName}
                userFullName={userFullName}
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
