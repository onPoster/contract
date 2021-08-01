import { NewPost } from '../generated/Poster/Poster'
import { Post } from '../generated/schema'

export function handleNewPost(event: NewPost): void {
  let post = new Post(event.transaction.hash.toHexString())
  post.poster = event.params.user
  post.type = "microblog"
  post.content = event.params.content
  post.save()
}
