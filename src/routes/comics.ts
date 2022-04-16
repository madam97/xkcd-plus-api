import express from 'express';
import axios from 'axios';
import { random, zeroPad } from '../functions';
import IComic from '../interfaces/IComic';

const comicsRouter = express.Router();

/**
 * Formats the given data to be a comic
 * @param data 
 * @returns 
 */
const formatComic = (data: any): IComic => {
  return {
    num: data.num,
    img: data.img,
    alt: data.alt,
    title: data.title,
    transcript: data.transcript ?? null,
    date: new Date(`${data.year}-${zeroPad(data.month, 2)}-${zeroPad(data.day, 2)}T00:00:00.000Z`)
  }
}

// GET /random - returns 9 comics' data randomly
comicsRouter.get('/random', async (req, res) => {
  try {
    const comicLimit = 9;

    const response = await axios.get('https://xkcd.com/info.0.json');
    const lastComicNum = response.data.num;

    const comicNums: number[] = [];
    const comicData: IComic[] = [];
    while (comicNums.length < comicLimit) {
      const num = random(1, lastComicNum);

      if (!comicNums.includes(num)) {
        try {
          const response = await axios.get(`https://xkcd.com/${num}/info.0.json`);

          comicData.push( formatComic(response.data) );
          comicNums.push(num);
        } catch (err) {

        }
      }
    }
  
    res.status(200).json(comicData);
  } catch (err) {
    res.status(404).json({ msg: err instanceof Error ? err.message : 'unknown error'});
  }
});

// GET /:id - returns the given comic's data
comicsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(`https://xkcd.com/${id}/info.0.json`);
    
    res.status(200).json( formatComic(response.data) );
  } catch (err) {
    res.status(404).json({ msg: err instanceof Error ? err.message : 'unknown error'});
  }
});

export default comicsRouter;