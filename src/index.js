import './index.scss';

const ChatBot = class {
  constructor(bots) {
    this.el = document.querySelector('#app');
    this.bots = bots;
  }

  renderHeader() {
    return `
    <header>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">Chatbot</span>
            </div>
        </nav>
    </header>
    `;
  }

  renderContainer() {
    return `
        <main class="container-fluid">
           <div class ="row">
              ${this.renderBotsList()}
              ${this.renderContentMessages()}
           </div>
        </main>
     `;
  }

  renderBotsList() {
    return `
    <section id="bot-list" class="col-3 mt-3 bg-light">
       ${this.bots.map((bot) => this.renderBot(bot)).join('')}
    </section>
     `;
  }

  renderBot(data) {
    const {
      id, name, avatar, countMessage
    } = data;

    return `
        <div data-id="${id}" class="row">
            <div class="col-3">
                <img width="80" src="${avatar}" class="img-fluid rounded-circle border border-dark border-2" alt="${name}" />
            </div>
            <div class="col-7 pt-4">
                <span class="h5">${name}</span>
            </div>
            <div class="col-2 pt-4">
                <span class="badge bg-primary rounded-pill">${countMessage}</span>
            </div>
        </div>
        <hr />
     `;
  }

  renderContentMessages() {
    return `
        <section id="content-messages" class="col-9">
            <div id="messages" class="row">
                <!-- Message send -->
                ${this.renderMessageSended()}
                <!-- Messsage received -->
                ${this.renderMessageReceived()}
            </div>
            ${this.renderInputMessage()}
        </section>
    `;
  }

  renderInputMessage() {
    return `
        <div id="input-message" class="row mt-3">
            <div class="col-12">
                <form class="row g-2">
                    <div class="col-10">
                        <input type="text" class="form-control" placeholder="Your message">
                    </div>
                    <div class="col-2">
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary mb-3">Send</button>
                        </div>
                    </div>
                </form>                        
            </div>
        </div>
    `;
  }

  renderMessageSended() {
    return `
        <div class="row mt-3">
            <div class="col-6"></div>
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        Avatar 1
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">21 décembre 2021 15h47</h5>
                        <p class="card-text">Pourriez-vous m'indiquer la météo du jour à Paris ?</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  renderMessageReceived() {
    return `
        <div class="row mt-3">
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        bot 1
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">21 décembre 2021 15h50</h5>
                        <p class="card-text">Actuellement le ciel est dégagé et ensoleillé sur Paris !</p>
                    </div>
                </div>
            </div>
            <div class="col-6"></div>
        </div>
    `;
  }

  addCountMessage(el) {
    const badge = el.querySelector('.badge');
    badge.textContent = parseInt(badge.textContent, 10) + 1;
  }

  run() {
    this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderContainer();

    const els = document.querySelectorAll('#bot-list > div');

    this.addCountMessage(els[0]);
    this.addCountMessage(els[0]);
    this.addCountMessage(els[0]);
    this.addCountMessage(els[1]);
    this.addCountMessage(els[1]);
    this.addCountMessage(els[2]);
  }
};

const bots = [{
  id: 1,
  name: 'bot1',
  avatar: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?size=338&ext=jpg',
  countMessage: 0
}, {
  id: 2,
  name: 'bot2',
  avatar: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?size=338&ext=jpg',
  countMessage: 0
}, {
  id: 3,
  name: 'bot3',
  avatar: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?size=338&ext=jpg',
  countMessage: 0
}];
const chatbot = new ChatBot(bots);

chatbot.run();
