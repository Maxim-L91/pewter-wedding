export const quizQuestions = [
  { q: "Как звали нашу первую кошку?", a: "Мурка" },
  { q: "Где мы провели отпуск 2019?", a: "Сочи" },
  { q: "Любимый фильм?", a: "Амели" },
  { q: "Когда мы впервые поехали за границу?", a: "2017" },
  { q: "Любимая еда?", a: "Суши" },
  { q: "Какой цвет ты чаще носишь?", a: "Розовый" },
  { q: "Куда мы поехали на годовщину 5 лет?", a: "Питер" },
  { q: "Как зовут твою подругу?", a: "Аня" },
  { q: "Любимая песня?", a: "Shallow" },
  { q: "Сколько лет мы вместе?", a: "10" }
];

export function startQuiz(startBtn, modal, foodDisplay, catImage, quizContainer) {
  startBtn.onclick = () => {
    modal.style.display = 'flex';
    let foodPoints = 0;
    foodDisplay.textContent = `Корм: ${foodPoints}`;
    catImage.src = '/images/cat-hungry.gif';
    quizContainer.innerHTML = '';

    quizQuestions.forEach((item, idx) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p>${idx + 1}. ${item.q}</p>
        <input type="text" id="answer-${idx}" placeholder="Ваш ответ" />
      `;
      quizContainer.appendChild(div);
    });

    const submit = document.createElement('button');
    submit.textContent = "Отправить ответы";
    submit.onclick = () => {
      foodPoints = 0;
      quizQuestions.forEach((item, idx) => {
        const answer = document.getElementById(`answer-${idx}`).value.trim().toLowerCase();
        if (answer === item.a.toLowerCase()) foodPoints += 10;
      });
      foodDisplay.textContent = `Корм: ${foodPoints}`;
      catImage.src = foodPoints >= 80 ? '/images/cat-happy.gif' :
                     foodPoints >= 40 ? '/images/cat-medium.gif' :
                                        '/images/cat-hungry.gif';
      modal.style.display = 'none';
    };
    quizContainer.appendChild(submit);
  };
}
