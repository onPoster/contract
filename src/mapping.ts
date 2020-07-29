import { newPost} from '../generated/Poster/Poster'
import { Post } from '../generated/schema'

export function handleNewPost(event: newPost): void {
  let post = new Post(event.params.id.toHex())
  post.poster = event.params.poster
  post.type = "microblog"
  post.content = "this is the content"
  post.save()
}
