const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  if (idx === 7 && smallCups[idx].classList.contains('full')) idx--;
  else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${(2 - 0.25 * fullCups).toFixed(2)}L`;
  }
}

// Función para mostrar un mensaje de alerta en la página
function showAlertMessage(message) {
  const alertMessage = document.createElement('div');
  alertMessage.classList.add('alert-message');
  alertMessage.textContent = message;

  document.body.appendChild(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, 5000); // Mostrar durante 5 segundos
}

// Función para inicializar las alertas cada dos horas
function initAlerts() {
  const now = new Date();
  const interval = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
  let nextAlertTime = new Date(now.getTime() + interval);

  smallCups.forEach((cup, idx) => {
    const alertTime = new Date(nextAlertTime.getTime() + idx * interval);
    createAlert(alertTime);
  });
}

// Inicializa las alertas al cargar la página
initAlerts();