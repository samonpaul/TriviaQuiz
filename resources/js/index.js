// Load Index.html

loadLandingHtml();

function loadLandingHtml(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './resources/snippets/landing-snippet.html', true);
    xhr.onload = function(){
        if(this.readyState = 200){
            let res = this.responseText;
            // console.log(res);
            const modal = document.getElementById('modal');
            document.getElementById('main-data').innerHTML = res;

            if(modal.classList.contains('hidden')){
                return loadGameSnippet();
            }
            
            document.querySelector('.close-modal').addEventListener('click', function(){

                modal.classList.add('hidden');
                loadGameSnippet();

            });
            
        }else {
            console.log("Landing Html - Error")
        }
    }

    xhr.send();
}

function loadGameSnippet(){
    const start = document.querySelector('.start-btn');
    const mainContent = document.querySelector('.main-content');
    const indexMain = document.querySelector('.index-main');

    setTimeout(() => {
        indexMain.classList.add('goDOWN');
        
    }, 400);

    start.addEventListener('click', function(){
        let gamefetch = new XMLHttpRequest();
        gamefetch.open('GET', './resources/snippets/game-snippet.html', true);
        gamefetch.onload = function(){
            if(this.readyState = 200){
                let gameRes = this.responseText;
                // console.log(gameRes);
                indexMain.classList.remove('goDOWN');
                indexMain.classList.add('goUP');
                setTimeout(() => {
                    document.getElementById('main-data').innerHTML = gameRes;
                    LoadGameHtml();  
                            
                }, 400);

            }else {
                console.log('Game Fetch - Error');
            }
        }
        gamefetch.send();


    });
};