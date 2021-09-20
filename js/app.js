const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const divTextBox = document.querySelector('.text-box');
const closeDivTextBox = document.querySelector('.close');
const selectElement = document.querySelector('select');

const humanExpression = [
   { img: "./img/drink.jpg", text: "Estou com sede" },
   { img: "./img/food.jpg", text: "Estou com fome" },
   { img: "./img/tired.jpg", text: "Estou cansado" },
   { img: "./img/hurt.jpg", text: "Estou machucado" },
   { img: "./img/angry.jpg", text: "Estou com raiva" },
   { img: "./img/sad.jpg", text: "Estou triste" },
   { img: "./img/scared.jpg", text: "Estou assustado" },
   { img: "./img/outside.jpg", text: "Quero ir lá fora" },
   { img: "./img/home.jpg", text: "Quero ir para casa" },
   { img: "./img/school.jpg", text: "Quero or para escola" },
   { img: "./img/grandma.jpg", text: "Quero ver a vovó" },
]

const utterance = new SpeechSynthesisUtterance();

const setTextMessage = text => {
   utterance.text = text;
}

const speakText = () => {
   speechSynthesis.speak(utterance);
}

const createExpressionBox = ({ img, text }) => {
   const div = document.createElement("div");

   div.classList.add("expression-box");
   div.innerHTML = `
    <img src="${img}" alt="${text}">
    <p class="info">${text}</p>
   `;

   div.addEventListener('click', () => {
      setTextMessage(text);
      speakText();

      div.classList.add('active');
      setTimeout(() => {
         div.classList.remove('active');
      }, 1000)
   });

   main.appendChild(div);
};

humanExpression.forEach(createExpressionBox);

let voices = [];

speechSynthesis.addEventListener('voiceschanged', () => {
   voices = speechSynthesis.getVoices();

   voices.forEach(({ name, lang }) => {
      const option = document.createElement('option');

      option.value = name;
      option.textContent = `${lang} | ${name}`
      selectElement.appendChild(option);
   });

});

buttonInsertText.addEventListener('click', () => {
   divTextBox.classList.add('show');
});

closeDivTextBox.addEventListener('click', () => {
   divTextBox.classList.remove('show');
});