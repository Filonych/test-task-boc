Задание:
Написать что выводит данный код. Предложите 2 варианта модификации кода, чтобы ответ был следующим: Bad: 10, Bad: 12, Good: 15, Good: 21

```javascript
const arr = [10, 12, 15, 21]

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
  }, 3000)
}
```

Ответ:
Данный код выводит:

Bad: undefined
Bad: undefined
Bad: undefined
Bad: undefined

Это происходит из-за того, что у var не блочная область видимости, поэтому во всех иттерациях будет использоваться одна и та же var. И в тот момент, когда через 3 сек запускается коллбек в SetTimeout, var имеет значение 4. А такого индекса в массиве arr нет.

Чтобы код выводил правильный ответ, надо:

1. Заменить var на let. Тогда при каждом повторении цикла будет своя независимая let и в каждом коллбеке будет использоваться то значение, которое было при соответствующей иттерации.
2. Убрать SetTimeout, чтобы код запускался синхронно, тогда console.log выполняется сразу, и каждая итерация ссылается на правильный индекс i.
