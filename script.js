/* Countdown */

let targetDate = new Date("June 14, 2027 12:00:00").getTime();

function updateCountdown() {
  let now = new Date().getTime();
  let diff = targetDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown").innerHTML = "🎓 Поздравляем!";
    return;
  }

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);



/* projects popup */



document.addEventListener('DOMContentLoaded', () => {
  let popup = document.getElementById('project-popup');
  let content = popup.querySelector('.popup-content');
  let btnPrev = popup.querySelector('.popup-prev');
  let btnNext = popup.querySelector('.popup-next');
  let btnClose = popup.querySelector('.popup-close');

  btnClose.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  let items = Array.from(document.querySelectorAll('.project-item'));
  let current = 0;

  function renderPopup(idx) {
    let item = items[idx];
    let orig = item.querySelector('img');
    let img = orig.cloneNode(true);
    let title = item.querySelector('h3').textContent;
    let desc = item.querySelector('p').textContent;
    let link = item.querySelector('a.project-link').href;

    content.innerHTML = '';
    content.append(img);
    content.insertAdjacentHTML('beforeend', `
      <h3>${title}</h3>
      <p>${desc}</p>
      <a class="btn" href="${link}" target="_blank">Смотреть код</a>
    `);

    btnPrev.classList.toggle('hidden', idx === 0);
    btnNext.classList.toggle('hidden', idx === items.length - 1);
  }

  items.forEach((it, i) => {
    it.addEventListener('click', e => {
      e.preventDefault();
      current = i;
      renderPopup(current);
      popup.classList.remove('hidden');
    });
  });

  btnPrev.addEventListener('click', () => {
    if (current > 0) renderPopup(--current);
  });
  btnNext.addEventListener('click', () => {
    if (current < items.length - 1) renderPopup(++current);
  });
  btnClose.addEventListener('click', () => {
    popup.classList.add('hidden');
  });
});



/* feedback popup */



let btnOpen = document.getElementById('open-feedback');
let popup = document.getElementById('feedbackPopup');
let btnClose = popup.querySelector('.close-btn');

btnOpen.addEventListener('click', () => {
  popup.classList.add('active');
});

btnClose.addEventListener('click', () => {
  popup.classList.remove('active');
});

popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.remove('active');
  }
});


let form = document.getElementById('feedbackForm');
let nameFld = document.getElementById('name');
let emailFld = document.getElementById('email');
let phoneFld = document.getElementById('phone');
let msgFld = document.getElementById('message');

let errName = document.getElementById('error-name');
let errEmail = document.getElementById('error-email');
let errPhone = document.getElementById('error-phone');
let errMsg = document.getElementById('error-message');

let reNameMsg = /^[А-Яа-яЁё\s]+$/;
let reEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
let rePhone = /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
let reMessage = /^[А-Яа-яЁё0-9\s.,!?()\-:;«»"']+$/;

form.addEventListener('submit', async e => {
  e.preventDefault();

  errName.textContent = '';
  errEmail.textContent = '';
  errPhone.textContent = '';
  errMsg.textContent = '';

  let valid = true;

  if (!nameFld.value.trim()) {
    errName.textContent = 'Введите имя';
    valid = false;
  } else if (!reNameMsg.test(nameFld.value.trim())) {
    errName.textContent = 'Только русские буквы';
    valid = false;
  }

  if (!emailFld.value.trim()) {
    errEmail.textContent = 'Введите email';
    valid = false;
  } else if (!reEmail.test(emailFld.value.trim())) {
    errEmail.textContent = 'Неверный формат email';
    valid = false;
  }

  if (!phoneFld.value.trim()) {
    errPhone.textContent = 'Введите телефон';
    valid = false;
  } else if (!rePhone.test(phoneFld.value.trim())) {
    errPhone.textContent = 'Неверный формат телефона';
    valid = false;
  }

  if (!msgFld.value.trim()) {
    errMsg.textContent = 'Введите сообщение';
    valid = false;
  } else if (!reMessage.test(msgFld.value.trim())) {
    errMsg.textContent = 'Только русские буквы, знаки препинания и цифры';
    valid = false;
  }

  if (!valid) return;
  
  let btn = form.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.classList.add('sending');
  btn.textContent = 'Отправляем...';

  setTimeout(() => {
    btn.classList.remove('sending');
    btn.classList.add('sent');
    btn.textContent = 'Успешно отправлено';
  }, 1500);
});



/* popup */



document.addEventListener('DOMContentLoaded', () => {
  let key = 'autoPopupClosed';
  if (localStorage.getItem(key)) return;

  let popup = document.getElementById('autoPopup');
  let btn   = popup.querySelector('.close-btn');

  setTimeout(() => {
    popup.classList.remove('hidden');
  }, 30000);

  btn.addEventListener('click', () => {
    popup.classList.add('hidden');
    localStorage.setItem(key, '1');
  });
});



/* Snow Flakes */



let container = document.querySelector('.snow-container');
let flakesCount = 50;
let flakes = [];
let mouseX = window.innerWidth / 2;

for (let i = 0; i < flakesCount; i++) {
  let el = document.createElement('img');
  el.src = 'snowflake.svg';
  el.className = 'snowflake';

  let size  = Math.random() * 0.5 + 0.6;
  let init = Math.random() * window.innerWidth;
  let dur = Math.random() * 10 + 10;
  let delay = Math.random() * -20;

  el.style.width  = `${size}rem`;
  el.style.height = `${size}rem`;
  el.style.left = `${init}px`;
  el.style.animationDuration = `${dur}s, ${dur/4}s`;
  el.style.animationDelay = `${delay}s, ${delay}s`;

  container.append(el);
  flakes.push({el, init});
}

window.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
});

let strength = 0.05;

function tick() {
  for (let i = 0; i < flakes.length; i++) {
    let f = flakes[i];
    let drift = (mouseX - f.init) * strength;
    f.el.style.left = `${f.init + drift}px`;
  }
  requestAnimationFrame(tick);
}

tick();