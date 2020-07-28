import { newPost} from '../generated/Poster/Poster'
import { Post } from '../generated/schema'

export function handleNewPost(event: newPost): void {
  let post = new Post(event.params.id.toHex())
  post.owner = event.params.owner
  post.type = event.params.type
  post.post = event.params.post
  post.save()
}
