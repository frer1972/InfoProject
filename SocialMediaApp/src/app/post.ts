import { User } from './user'

export class Post 
{
    postId: number

    content: string

    owner: User

    constructor(content: string, user: User)
    {
        this.content = content
        this.owner = user
    }
}
