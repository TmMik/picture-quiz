// База загадок с картинками
const riddlesData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop',
        answer: 'кот',
        alternatives: ['кот', 'кошка', 'кошечка', 'кіт'],
        hint: 'Пушистое животное, которое говорит "Мяу"',
        difficulty: 1
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1599599810694-b308ca884628?w=400&h=400&fit=crop',
        answer: 'яблоко',
        alternatives: ['яблоко', 'яблочко', 'яблочек'],
        hint: 'Красный или зелёный фрукт, который едят с ветки',
        difficulty: 1
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
        answer: 'часы',
        alternatives: ['часы', 'часик', 'будильник'],
        hint: 'Прибор, который показывает время',
        difficulty: 2
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
        answer: 'гора',
        alternatives: ['гора', 'горка', 'горочка'],
        hint: 'Высокое возвышение из земли и камней',
        difficulty: 2
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b0?w=400&h=400&fit=crop',
        answer: 'книга',
        alternatives: ['книга', 'книжка', 'книжечка'],
        hint: 'Что читают в библиотеке?',
        difficulty: 1
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1505394033641-a2b2b00c85dd?w=400&h=400&fit=crop',
        answer: 'солнце',
        alternatives: ['солнце', 'солнышко', 'солнечко'],
        hint: 'Звезда, которая светит днём',
        difficulty: 1
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
        answer: 'машина',
        alternatives: ['машина', 'авто', 'автомобиль', 'автомашина', 'машинка', 'машинечка'],
        hint: 'Средство транспорта с четырьмя колёсами',
        difficulty: 1
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
        answer: 'цветок',
        alternatives: ['цветок', 'цветочек', 'цветочек', 'роза', 'цветочки'],
        hint: 'Красивое растение в саду',
        difficulty: 1
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=400&fit=crop',
        answer: 'собака',
        alternatives: ['собака', 'собачка', 'пёс', 'пес', 'собачечка'],
        hint: 'Верный друг человека, лает на незнакомцев',
        difficulty: 1
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=400&fit=crop',
        answer: 'океан',
        alternatives: ['океан', 'море', 'вода', 'волны'],
        hint: 'Большое количество воды',
        difficulty: 2
    }
];

// Функция для получения случайной загадки
function getRandomRiddle() {
    return riddlesData[Math.floor(Math.random() * riddlesData.length)];
}

// Функция для получения загадки по ID
function getRiddleById(id) {
    return riddlesData.find(r => r.id === id);
}

// Функция для нормализации ответа
function normalizeAnswer(answer) {
    return answer.toLowerCase().trim();
}

// Функция для проверки ответа
function checkAnswer(userAnswer, riddle) {
    const normalized = normalizeAnswer(userAnswer);
    const alternatives = riddle.alternatives || [riddle.answer];
    return alternatives.some(alt => normalizeAnswer(alt) === normalized);
}
