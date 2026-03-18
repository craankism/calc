const formEl = document.querySelector('.form');
const termInputEl = document.querySelector('#term-input');

function applyInputSizing() {
    const value = (termInputEl.value || '').trim();
    const len = value.length;
    termInputEl.classList.toggle('input--small', len > 13);
    termInputEl.classList.toggle('input--smaller', len > 20);
}

// Typing triggers this automatically.
termInputEl.addEventListener('input', applyInputSizing);

// Button clicks update input.value programmatically (no input event), so re-check after clicks.
document.addEventListener('click', event => {
    if (event.target && event.target.tagName === 'BUTTON') {
        requestAnimationFrame(applyInputSizing);
    }
});

applyInputSizing();

formEl.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);

    fetch('/calc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            const resultEl = document.querySelector('h2');
            const result = data && (data.result || data.value || JSON.stringify(data));
            resultEl.textContent = "= " + result;
            applyInputSizing();
        });
});