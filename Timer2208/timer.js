let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {

    clearInterval(countdown);  //Limpiar la Variable 

    const now = Date.now(); // Browser q hora es ? 
    const then = now + seconds * 1000;    // captcha valor convertir segundos 
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()  =>  {
        const secondsLeft = Math.round(( then - Date.now()) / 1000 );   // Fnc Mate para generar la Resta valor tiempo ingreso - tiempo actual

        if(secondsLeft < 0) {               // Condicion ayuda limpiar la propiedad de seg restantes 
            clearInterval(countdown);      
            return;
        }
            // tiempo restante
        displayTimeLeft(secondsLeft);


    }, 1000 );

}   
    function displayTimeLeft(seconds) {

        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;

        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

        document.title = display;    // draw 

        timerDisplay.textContent = display;  // draw 


    }

      
    
    function displayEndTime(timestamp) {

        const end = new Date(timestamp);   // libreria 
        const hour = end.getHours();

        const adjustedHour = hour > 12 ? hour - 12 : hour;
        const minutes = end.getMinutes();
        endTime.textContent = ` Be back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} `;  // draw

    }


    function startTime (){
        const seconds = parseInt(this.dataset.time);
        timer(seconds);
    }


    buttons.forEach(button => button.addEventListener('click', startTime ));

    document.customForm.addEventListener('submit', function(e)  {

        e.preventDefault();
        const mins = this.minutes.value;
        console.log(mins);    // LOG
        timer(mins * 60);
        this.reset();

    });


