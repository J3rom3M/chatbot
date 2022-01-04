import Bot from './bot';

const Tchat = class {
  constructor(bots) {
    this.el = document.querySelector('#app');
    this.bots = this.createBots(bots);
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
        ${this.bots.map((bot) => this.renderBot(bot.entity)).join('')}
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
              <div id="messages" class="row"></div>
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

  renderMessageSended(message) {
    const date = new Date();

    return `
          <div class="row mt-3">
              <div class="col-6"></div>
              <div class="col-6">
                  <div class="card">
                      <div class="card-header">
                          Avatar 1
                      </div>
                      <div class="card-body">
                          <h5 class="card-title">${date.toLocaleString()}</h5>
                          <p class="card-text">${message}</p>
                      </div>
                  </div>
              </div>
          </div>
    `;
  }

  renderMessageReceived(message) {
    const date = new Date();

    return `
          <div class="row mt-3">
              <div class="col-6">
                  <div class="card">
                      <div class="card-header">
                          bot 1
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">${date.toLocaleString()}</h5>
                        <p class="card-text">${message}</p>
                      </div>
                  </div>
              </div>
              <div class="col-6"></div>
          </div>
    `;
  }

  sendMessage() {
    const messagesEl = document.querySelector('#messages');
    const inputEl = document.querySelector('#input-message input');
    const buttonEl = document.querySelector('#input-message button');

    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();

      const { value } = inputEl;

      messagesEl.innerHTML += this.renderMessageSended(inputEl.value);
      this.searchActionByBot(value);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      inputEl.value = '';
    });
  }

  addCountMessage(el) {
    const badge = el.querySelector('.badge');
    badge.textContent = parseInt(badge.textContent, 10) + 1;
  }

  createBots(bots) {
    return bots.map((bot) => new Bot(bot));
  }

  searchActionByBot(value) {
    const messagesEl = document.querySelector('#messages');
    const messages = this.bots.filter((bot) => {
      const message = bot.findActionByValue(value);
      const { id, name, avatar } = bot.entity;
      if (message) {
        return {
          id,
          name,
          avatar,
          message
        };
      }
    });

    messages.forEach((message) => {
      if (message) {
        messagesEl.innerHTML += this.renderMessageReceived(message);
      }
    });
  }

  run() {
    this.el.innerHTML += this.renderHeader();
    this.el.innerHTML += this.renderContainer();
    this.sendMessage();
  }
};

export default Tchat;
