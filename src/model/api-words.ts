import type { Word } from './app-types';

export const API_ENDPOINT = 'https://rss-rs-lang.herokuapp.com';

export function getWord (id:string){
  const url = new URL(`${API_ENDPOINT}/words/${id}`);
  return fetch(url, { method: 'GET' }).then(res => {
    if(res.ok){
      return res.json();
    }
    throw new Error(res.statusText);
  }).then((word:Word) => word).catch(err => {console.log(err);}).finally(() => {});;
}

export function getWords (group: string, page: string) {
  const url = new URL(`${API_ENDPOINT}/words`);
  const params = [
    ['group', group],
    ['page', page],
  ];
  const queryParams = new URLSearchParams(params);
  url.search = queryParams.toString(); // url + ? + params
  return fetch(url, {
    method: 'GET',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((words: Word[]) => words)
    .catch(err => {
      console.log(err);
    })
    .finally(() => {});
}

export async function getWordsAsync (group: string, page: string){

  const url = new URL(`${API_ENDPOINT}/words`);
  const params = [
    ['group', group],
    ['page', page],
  ];
  const queryParams = new URLSearchParams(params);
  url.search = queryParams.toString();

  let result: Word[] = [];
  try{
    const response = await fetch(url, { method: 'GET' });

    if (response.status === 200) {
      result =  await response.json() as Word[];
    }
  } catch (e) {throw new Error();}

  return result;

}
