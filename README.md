# Тестовое задание

## Запуск
```bash
$ yarn build
$ yarn start

```



## Открытые endpoint-ы

```bash
-localhost:3000/users/create 
    POST
    {
        "firstName": "Timur",
        "lastName": "Finaev",
        "age": 22,
        "gender": "male",
        "hasIssues": false
    }
    
    
-localhost:3000/users/update
    POST
    В body отправляется объект с любым 
    набором ключей из вышеуказанных.
    
    
-localhost:3000/users/find_all
    GET
    Не оптимизировано под большое кол-во юзеров.
    Впрочем, специальных указаний и не было.


-localhost:3000/users/update_issues_fields
    POST
    Отправляет 1 запрос. 
    
    
-localhost:3000/user_history/
    GET
    Выдает веб-страницу с динамически обновляющимся AG Grid-ом. 
    Есть постраничная навигация, но на реализацию интерфейса между filterModel 
    AG Grid и SQL меня не хватило. Видимо, я просто не знаю, как подойти к этому, 
    кроме построения дерева вложенных switch-ей.
    
```



