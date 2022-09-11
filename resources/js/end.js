
function loadEndSnippet(){
    let endfetch = new XMLHttpRequest();
    endfetch.open('GET', './resources/snippets/end-snippet.html', true);
    endfetch.onload = function(){
        if(this.readyState = 200){
            let endRes = this.responseText;
            // console.log(endRes);

            document.getElementById('main-data').innerHTML = endRes;
            loadEndHtml();

        }else {
            console.log('Game Fetch - Error');
        }
    }
    endfetch.send();
};

function loadEndHtml() {
    const mainScore = document.getElementById('end__score');
    const scoreOverlay = document.querySelector('.end__score-overlay');
    const restart = document.querySelector(".restart");
    const endMain = document.querySelector('.end-main');

  
  
    function loadFinalScore() {
      let finalScore = localStorage.getItem("mainScore");
  
      // show score
      mainScore.textContent = finalScore;
      scoreOverlay.style.background = `conic-gradient(
          var(--secondary-blue) ${finalScore}%,
          var(--primary-blue) ${finalScore}%
      )`;

        setTimeout(() => {
            endMain.classList.add('goDOWN');
        }, 400);

    }
    loadFinalScore(); 
    restart.addEventListener('click', function(){
        endMain.classList.remove('goDOWN');
        endMain.classList.add('goUP');

        setTimeout(() => {
            loadLandingHtml();
        }, 400);
    });
}