import { BigInt } from '@graphprotocol/graph-ts'

import { NewPost } from '../generated/Poster/Poster'
import { Post } from '../generated/schema'


export function handleNewPost(event: NewPost): void {
  let timestamp = event.block.timestamp.toI32()
  let id = BigInt.fromI32(timestamp).toString()
    .concat('-')
    .concat(event.transaction.hash.toHexString())
  let post = new Post(id)
  post.poster = event.params.user
  post.type = "microblog"
  post.content = event.params.content
  post.save()
}
