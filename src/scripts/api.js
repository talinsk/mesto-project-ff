const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-34",
  headers: {
    authorization: "f7a9545f-e758-4959-84ad-7f63ac7c6582",
    "Content-Type": "application/json",
  },
};

// функция получения данных о пользователе
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return handleErrorResponse(res);
  });
};

// функция загрузки карточек с сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return handleErrorResponse(res);
  });
};

// функция редактирования профиля
export const updateUser = (userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userInfo)
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return handleErrorResponse(res);
  });
};

// функция добавления новой карточки


// функция удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(res => {
    if (!res.ok) {
      return handleErrorResponse(res);  
    }
  });
};


// функции обработки ошибок
// функция генерации ошибки, параметры: код статуса ответа и текст ошибки
const throwError = (status, errorMessage) => {
  throw new Error(`Код статуса: ${status}. Ошибка: ${errorMessage}`);
}

// функция обработки ответа от сервера
const handleErrorResponse = (res) => {
  if (res.headers.get('Content-Type').includes('application/json')) {
    // если сервер возвращает json
    return res.json().then(json => {      
      // проверяем, есть ли поле message, возвращаем его
      if (json.message) {        
        throwError(res.status, json.message);
      }
      else {
        // если поля message нет, то возвращаем весь json
        throwError(res.status, JSON.stringify(json));
      }      
    });
  }
  else {
    // если не json, то возвращаем текст в качестве ошибки
    return res.text().then(text => {      
      throwError(res.status, text);
    });
  }
};