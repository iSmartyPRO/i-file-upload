# Описание

Небольшой кусок кода, в котором реализован front-end и back-end для загрузки файлов на сервер.
Предварительно перед загрузкой фотографий возможно обрезать фотографию и затем отправить обрезанный кусок на сервер.

# Скриншоты

## File
![Вкладка File](https://github.com/iSmartyPRO/i-file-upload/blob/master/screenshots/file.jpg)

## Files
![Вкладка Files](https://github.com/iSmartyPRO/i-file-upload/blob/master/screenshots/files.jpg)

## Пользователи
![Вкладка Users](https://github.com/iSmartyPRO/i-file-upload/blob/master/screenshots/users.jpg)
![Вкладка Users](https://github.com/iSmartyPRO/i-file-upload/blob/master/screenshots/userNew.jpg)


## Back-end
реализован на NodeJS

### End-Points:

#### Информамационный (Method: GET)
/

#### загрузка одного файла (Method: POST)
/api/file

#### загрузка нескольких файлов (Method POST)
/api/files

#### ПОЛЬЗОВАТЕЛИ

#### Список всех пользователей +аватары (Method GET)
/api/users

#### Отображение пользователя по id  (Method GET)
/api/users/:id

#### Создание пользователя  (Method POST)
/api/users/

#### Обновление пользователя  (Method PATCH)
/api/users/:id

если в теле запроса имеется removeAvatar, то выполняется удаление аватара для пользователя

#### Удаление пользователя  (Method DELETE)
/api/users/:id


## Front-End
реализован на Vue 3

используются маршруты

### Маршруты

#### Загрузка одного изображения
/file

Функции:
выбрать фото,
обрезать фото
отправить фото back-end


#### Загрузка нескольких изображений
/files

Функции:
выбрать фотоaфию,
обрезать фотографию
добавить обрезанную фотографию в массив
отправить массив фотографий на back-end

#### ПОЛЬЗОВАТЕЛИ

##### Отображение всех пользователей, с аватарами
/users
на этой странице имеются функциональные кнопки для удаления пользователей и редактирования

##### Создание пользователя
/user/new
можно ввести основные данные о пользователе, а так же назначить аватар - предварительно обрезав квадратом.

##### отображение информации о пользователе
/user/:id
на этой странице можно удалить аватар нажав на кнопку корзины возле аватар с предварительным подтверждением
активировать кнопку изменить пароль
назначить/обновить аватар


# Установка

## Клонирование проекта
```
git clone https://github.com/iSmartyPRO/i-file-upload.git
```

## Запуск проекта

### Back-End
```
cd i-file-upload/back-end
npm install
npm run dev
```
Порт по умолчанию: http://localhost:3000
Настройки порта можно изменить в ./back-end/config.js

### Back-End
```
cd i-file-upload/front-end
npm install
npm run serve
```
Более подробно описано в ./front-end/README.md


# Others
Для полноченной работы данного проекта необходимо настроить необходимое окружение на компьютере

Более подробно описано в README.md папки Others