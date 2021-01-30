import {getRandomChoices, getRandomElem} from './random';

export const ar = [
  {
    id: 1,
    text: 'huwa',
  },
  {
    id: 2,
    text: 'humaa',
  },
  {
    id: 3,
    text: 'hom',
  },
  {
    id: 4,
    text: 'heya',
  },
  {
    id: 5,
    text: 'hunna'
  },
  {
    id: 6,
    text: 'anta'
  },
  {
    id: 7,
    text: 'antomaa'
  },
  {
    id: 8,
    text: 'antum'
  },
  {
    id: 9,
    text: 'anti'
  },
  {
    id: 10, 
    text: 'antounna'
  },
  {
    id: 11,
    text: 'ana'
  },
  {
    id: 12,
    text: 'nahnu'
  },
]

export const en = [
  {
    id: 1,
    text: 'he'
  },
  {
    id: 2,
    text: 'both of them'
  },
  {
    id: 3,
    text: 'them'
  },
  {
    id: 4,
    text: 'her'
  },
  {
    id: 5,
    text: 'both of them (f)'
  },
  {
    id: 6,
    text: 'them (f)'
  },
]

export const allChoicesEn = [
  {
    id: 1,
    text: 'he'
  },
  {
    id: 2,
    text: 'both of them (m/f)'
  },
  {
    id: 3,
    text: 'them'
  },
  {
    id: 4,
    text: 'her'
  },
  {
    id: 5,
    text: 'them (f)'
  },
  {
    id: 6,
    text: 'you'
  },
  {
    id: 7,
    text: 'both of you (m/f)'
  },
  {
    id: 8,
    text: 'you all'
  },
  {
    id: 9,
    text: 'you (f)'
  },
  {
    id: 10,
    text: 'you all (f)'
  },
  {
    id: 11,
    text: 'I'
  },
  {
    id: 12,
    text: 'We'
  },
]


export const generateArToEn = ({count, numChoices= 'ALL'}) => {
  const result = [];
  for(let i = 0; i < count; i++) {
    const question = getRandomElem(ar);
    const answer = question.id;
    const obj = {
      question,
      answer,
      choices: numChoices === 'ALL' ? allChoicesEn : getRandomChoices({choices: en, count: numChoices, answer})
    }
    result.push(obj)
  }
  return result;
}