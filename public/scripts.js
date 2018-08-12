console.log('console');


const dater = document.getElementsByClassName('theDayDate');

for (let i = 0; i < dater.length; i++) {
  if (dater[i].innerHTML === 'Invalid date') {
    dater[i].innerHTML = '';
  }
}
