import express from 'express';
import axios from 'axios';
import { random, zeroPad } from '../functions';
import IComic from '../interfaces/IComic';

const comicRouter = express.Router();

comicRouter.get('/random', async (req,res) => {
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

          const comic: IComic = {
            num: response.data.num,
            img: response.data.img,
            alt: response.data.alt,
            title: response.data.title,
            transcript: response.data.transcript ?? null,
            date: new Date(`${response.data.year}-${zeroPad(response.data.month, 2)}-${zeroPad(response.data.day, 2)}T00:00:00.000Z`)
          };

          comicData.push(comic);
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

export default comicRouter;