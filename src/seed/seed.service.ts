import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from '../seed/interfaces/poke-responce.interface'
import { url } from 'inspector';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class SeedService {
  

  private readonly axios : AxiosInstance = axios;
  
  constructor
  (
    private readonly httpService: HttpService
  ){}

  async executeSeed(){

    return await this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150',{
      proxy:{
        host:'dssat.sat.gob.mx',
        port:3128,
        protocol:'http',
        auth:{
          username:'GACJ935C',
          password:'C4listenia20245678'
        }
      }
    });
    

    // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=150');
    
    // data.results.forEach(({name, url}) => {
    //   const segment = url.split('/');
    //   const no =  +segment[ segment.length - 2];

    // });
    
    //return data.results;
  }
}

