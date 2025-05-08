import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit:number;
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  )
  {
    
    this.defaultLimit = Number(configService.get<number>('defaultLimit'));
    //configService.getOrThrow('defaultLimiy');
  }

  async create(createPokemonDto: CreatePokemonDto) {

    try {
      
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch (error) {
      this.handleExeption(error);
    }

    
  }

  findAll( paginationDto: PaginationDto ) {

    const { limit = this.defaultLimit , offset = 0 } = paginationDto;

    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      no:1
    })
    .select('-__v');
  }

  async findOne(term: string) {
    let pokemon;

    if ( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if ( pokemon == null && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById({ id: term });
    }

    if (pokemon == null) {
      pokemon = await this.pokemonModel.findOne({ name : term.toLowerCase().trim() });

    }

    if ( pokemon == null) {
      throw new NotFoundException(`Pokemon with id, name or no "${ term }" not fund`);
    }   

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    try {

      const result = await this.pokemonModel.findByIdAndUpdate(term, updatePokemonDto, {new : true });
      // if ( deletedCount ) {
      //   throw new BadRequestException(`Pokemon with id: ${ term } not fund`);
      // }
      //console.log(result);
      return result;

    } catch (error) {
      this.handleExeption( error );
    }
    
  }

  async remove(id: string ) {
    //const result = await this.pokemonModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id : id });
    
    if ( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with id: ${id} not fund`);
    }

    return;
  }

  private handleExeption( error: any ){
    if (error.code === 1100) {
      throw new BadRequestException(`Pokemon exits in db ${ JSON.stringify( error.value ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can´t create Pokémon - Check server logs`); 
  }
}
