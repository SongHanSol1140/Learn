import { Controller, Delete, Get, Param, Patch, Post, Body, Query, Req } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}
    
    @Get()
    // getAll(@Req() req, @RES() res) :Movie[] {
    // => Req, Res와 같은 express 객체를 사용할 수 있지만, NestJS에서는 사용하지 않는 것이 좋다.
    // => NestJS는 express 위에서 동작하지만, express의 모든 기능을 사용하지 않는다.
    // => NestJS는 express의 기능을 추상화하여 제공한다.
    // => 따라서, NestJS의 기능을 사용하는 것이 좋다.
    getAll() :Movie[] {
        return this.moviesService.getAll();
    };

    
    @Get("search")
    search(@Query('year') searchingYear: string){
        return `We are searching for a movie a made after: ${searchingYear}`
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number) {
        // console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    };

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    };

    @Delete("/:id")
    remove(@Param('id') movieId:number) {
        return this.moviesService.deleteOne(movieId);
    };

    @Patch("/:id")
    patch(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto){
        this.moviesService.update(movieId, updateData);
        const movie = this.moviesService.getOne(movieId);
        console.log(movie);
        return 200
    }



}   

function RES(): (target: MoviesController, propertyKey: "getAll", parameterIndex: 1) => void {
    throw new Error('Function not implemented.');
}

