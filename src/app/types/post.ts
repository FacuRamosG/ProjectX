export interface Post {
  content: string
  created_at: string
  id: string
  user_id: string
  user: {
    name: string | null
    avatar_url: string
    user_name: string
  } | null
}
