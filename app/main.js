import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
    showSpinner();
    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });
    

    if (response.ok) {
      const { text } = await response.json();

      const result = document.querySelector('#result');
      result.innerHTML = `<p> ${text} </p>`;
    } else {
      const err = await response.text();
      alert(err);
      console.error(err);
    }

    hideSpinner();

});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Writing... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Think';
}
