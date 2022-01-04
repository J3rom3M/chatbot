import Tchat from './tchat';

import './index.scss';

const bots = [{
  id: 1,
  name: 'bot1',
  avatar: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?size=338&ext=jpg',
  countMessage: 0,
  actions: [{
    name: 'hello',
    keywords: ['hello', 'bonjour', 'salut', 'ola'],
    action: () => 'Bonjour'
  }]
}, {
  id: 2,
  name: 'bot2',
  avatar: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?size=338&ext=jpg',
  countMessage: 0,
  actions: [{
    name: 'hello',
    keywords: ['hello', 'bonjour', 'salut', 'ola'],
    action: () => 'Bonjour'
  }]
}];
const tchat = new Tchat(bots);

tchat.run();
