import { Injectable, NotFoundException } from '@nestjs/common'

import { isNil } from 'lodash'

import { CreatePostDto } from '../dtos/create-post.dto'
import { UpdatePostDto } from '../dtos/update-post.dto'
import { PostEntity } from '../types'

@Injectable()
export class PostService {
    protected posts: PostEntity[] = [
        { title: 'Title 1', body: 'Content 1' },
        { title: 'Title 2', body: 'Content 2' },
        { title: 'Title 3', body: 'Content 3' },
        { title: 'Title 4', body: 'Content 4' },
        { title: 'Title 5', body: 'Content 5' },
        { title: 'Title 6', body: 'Content 6' },
    ].map((v, id) => ({ ...v, id }))

    async findAll() {
        return this.posts
    }

    async findOne(id: number) {
        const post = this.posts.find((item) => item.id === id)
        if (isNil(post)) throw new NotFoundException(`the post with id ${id} doesn't exists!`)
        return post
    }

    async create(data: CreatePostDto) {
        const newPost: PostEntity = {
            id: Math.max(...this.posts.map(({ id }) => id + 1)),
            ...data,
        }
        this.posts.push(newPost)
        return newPost
    }

    async update(data: UpdatePostDto) {
        let toUpdate = this.posts.find((item) => item.id === data.id)
        if (isNil(toUpdate))
            throw new NotFoundException(`the post with id ${data.id} doesn't exist!`)
        toUpdate = { ...toUpdate, ...data }
        this.posts = this.posts.map((item) => (item.id === data.id ? toUpdate : item))
        return toUpdate
    }

    async delete(id: number) {
        const toDelete = this.posts.find((item) => item.id === id)
        if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} doesn't exists!`)
        this.posts = this.posts.filter((item) => item.id !== id)
        return toDelete
    }
}
