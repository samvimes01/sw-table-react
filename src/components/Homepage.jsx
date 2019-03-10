/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const Homepage = () => (
  <>
    <h1>SPA для отображения данных swapi</h1>
    <ul>
      <li><code>/home</code> - Страница с описанием вашего приложения и боковой панелью навигации</li>
      <li>Старицы списков для всех ресурсов в документации использующие <a href="/fe-program/js/tasks/datatable.html">Datatable</a></li>
      <li>добавить в <code>columnConfig</code> параметр <code>link: '/people/:fieldName'</code>
        <ul>
          <li>в колонке с таким параметром нужно сделать ссылку по указанному шаблону
    (значение для параметра взять из соответствующего поля объекта)
            <ul>
              <li><code>/people/:id</code> превратится в <code>/people/123</code></li>
              <li><code>/people/:name</code> в <code>/people/John</code></li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Страницы для подробной информации о каждом ресурсе открывающиеся по ссылкам из таблиц</li>
    </ul>
  </>
);


export default Homepage;
