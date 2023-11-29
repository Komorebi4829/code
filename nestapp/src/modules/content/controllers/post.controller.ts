import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreatePostDto } from '../dtos/create-post.dto'
import { UpdatePostDto } from '../dtos/update-post.dto'
import { PostService } from '../services/post.service'

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    async index() {
        return this.postService.findAll()
    }

    @Get(':id')
    async show(@Param('id', new ParseIntPipe()) id: number) {
        return this.postService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create post' })
    async store(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['create'],
            }),
        )
        data: CreatePostDto,
    ) {
        return this.postService.create(data)
    }

    @Patch(':id')
    async update(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['update'],
            }),
        )
        data: UpdatePostDto,
    ) {
        return this.postService.update(data)
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number) {
        return this.postService.delete(id)
    }
}
