import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from '../seed/interfaces/poke-responce.interface'
import { url } from 'inspector';
import { HttpService } from '@nestjs/axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class SeedService {
  

  
  // proxyURL = `http://GACJ935C:C4listenia20245@proxy.sat.gob.mx:3128`;
  // agent = new HttpsProxyAgent(this.proxyURL);


  constructor
  (
    @InjectModel(Pokemon.name)
    private readonly pokeModel : Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){

    // return await this.httpService.get('https://dog.ceo/api/breeds/image/random',{
    //   httpAgent: this.agent
    // });
    const pokemonToInsert : { name: string, no: number }[] = [];
    await this.pokeModel.deleteMany({});
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150');
    
    data.results.forEach( async ({name, url}) => {
      const segment = url.split('/');
      const no =  +segment[ segment.length - 2];
      //const pokemon = await this.pokeModel.create({ name, no});
      pokemonToInsert.push({name, no});

    });
    
    await this.pokeModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
  }

  async executeSeed_(file : Express.Multer.File){

    const pokemonToInsert : { name: string, no: number }[] = [];
    await this.pokeModel.deleteMany({});

    const jsonData = JSON.parse(file.buffer.toString());

    jsonData.results.forEach( async ({name, url}) => {
      const segment = url.split('/');
      const no =  +segment[ segment.length - 2];
      //const pokemon = await this.pokeModel.create({ name, no});
      pokemonToInsert.push({name, no});

    });


    await this.pokeModel.insertMany(pokemonToInsert);
    return 'Seed Execute';
    
  }
}

