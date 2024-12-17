const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "863c545a-5c56-44dc-b1ab-0d2b82171b3f",
    "Content-Type": "application/json",
  },
};

// Функция проверки статуса;

const responseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  /* отклоняем промис, чтобы перейти
    в блок catch, если сервер вернул ошибку */
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Общая функция запроса, которая может принимать 2 или 3 аргумента;

const request = (url, methodValue, bodyData) => {
  const options = {
    method: `${methodValue}`,
    headers: config.headers,
  };
  if (bodyData != undefined) {
    options.body = JSON.stringify(bodyData);
  }
  return fetch(url, options).then(responseStatus);
};

export function getUserData() {
  return request(`${config.baseUrl}/users/me`,"GET");
}

export function getInitialCards() {
  return request(`${config.baseUrl}/cards`,"GET");
}

export function patchProfile(name, job) {
  return request(`${config.baseUrl}/users/me`,"PATCH", {name: name, about: job});
}

export function postCard(card) {
  return request(`${config.baseUrl}/cards`,'POST', {name: card.name, link: card.link});
}