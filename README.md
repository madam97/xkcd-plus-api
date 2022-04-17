# xkcd Plus API

The API for the xkcd Plus website.

[Frontend readme](https://github.com/madam97/xkcd-plus#readme)

## Database

The website doesn't use database.

## API endpoints

- see below the Body and Response data types

| Method  | Endpoint            | Response      | Description      |
| ------- | ------------------- | ------------- | --------------- |
| GET     | /comics/random      | Comic[]       | Gives back 9 random comic strip |
| GET     | /comics/:num        | Comic         | Gives back the given comic strip |

## Response data types

```ts
interface Comic {
  num: number,
  img: string,
  alt: string,
  title: string,
  transcript: string | null,
  date: Date
}
```