console.log('console');

const revealer = document.getElementById('revealer');
const popHide = document.getElementById('pop-hide');

const story = document.getElementById('story-pop');

revealer.addEventListener("click", function() {
  return  story.style.display = 'block';
})

popHide.addEventListener("click", function() {
  story.style.display = 'none';
})
