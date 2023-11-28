import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common'
import { isNil } from 'lodash'

import { PostEntity } from '../types'

let posts: PostEntity[] = [
    { title: 'Title 1', body: 'Content 1' },
    { title: 'Title 2', body: 'Content 2' },
    { title: 'Title 3', body: 'Content 3' },
    { title: 'Title 4', body: 'Content 4' },
    { title: 'Title 5', body: 'Content 5' },
    { title: 'Title 6', body: 'Content 6' },
].map((v, id) => ({ ...v, id }))

@Controller('posts')
export class PostController {
    @Get()
    async index() {
        return posts
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        const post = posts.find((item) => item.id === Number(id))
        if (isNil(post)) {
            throw new NotFoundException(`the post with id ${id} doesn\'t exist!`)
        }
        return post
    }

    @Post()
    async store(@Body() data: PostEntity) {
        const newPost = {
            id: Math.max(...posts.map(({ id }) => id + 1)),
            ...data,
        }
        posts.push(newPost)
        return newPost
    }

    @Patch(':id')
    async update(@Body() data: PostEntity) {
        let toUpdate = posts.find((it) => it.id === Number(data.id))
        if (isNil(toUpdate)) {
            throw new NotFoundException(`the post with id ${data.id} doesn\'t exist!`)
        }
        toUpdate = {
            ...toUpdate,
            ...data,
        }
        posts = posts.map((it) => (it.id === Number(data.id) ? toUpdate : it))
        return toUpdate
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const toDelete = posts.find((item) => item.id === Number(id))
        if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} not exits!`)
        posts = posts.filter((item) => item.id !== Number(id))
        return toDelete
    }
}
