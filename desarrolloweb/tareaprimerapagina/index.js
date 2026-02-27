let cntr = 1;

function evol(){
    if(cntr == 0){
        document.getElementById("bulbasaur").src = "bulba.png";
        changetext();
    }
    else if (cntr == 1){
        document.getElementById("bulbasaur").src = "002.png";
        changetext();
    }
    else if(cntr == 2){
        document.getElementById("bulbasaur").src = "003.png";
        changetext();
    }
}
function changetext(){
    if(cntr == 0){
        cntr++;
        document.getElementById("h1bu").innerHTML = "Informacion de bulbasaur";
        document.getElementById("p1bu").innerHTML = "Bulbasaur es un Pokémon de tipo Planta/Veneno introducido en la primera generación de la saga y uno de los iniciales de la región de Kanto, debutando en Pokémon Red y Pokémon Blue. Se caracteriza por la semilla que lleva en su espalda, la cual crece a medida que absorbe energía solar y le permite evolucionar primero en Ivysaur y después en Venusaur. Es conocido por movimientos como Látigo Cepa y Rayo Solar, y por su habilidad Espesura, que potencia sus ataques de tipo Planta cuando su salud es baja, siendo considerado uno de los mejores Pokémon iniciales para principiantes por su equilibrio entre ataque y defensa.";
    }
    else if(cntr == 1){
        cntr++;
        document.getElementById("h1bu").innerHTML = "Informacion de ivysaur";
        document.getElementById("p1bu").innerHTML = "Ivysaur es un Pokémon de tipo Planta/Veneno que pertenece a la primera generación y es la evolución de Bulbasaur. Se distingue por el capullo más desarrollado que crece sobre su lomo, el cual almacena energía solar para continuar su crecimiento y prepararse para su siguiente evolución, Venusaur. A medida que madura, el peso del capullo aumenta, volviéndolo más fuerte y resistente en combate. Ivysaur aprende movimientos más potentes como Hoja Afilada y continúa aprovechando habilidades como Espesura, que incrementa el poder de sus ataques de tipo Planta cuando su salud es baja, destacándose por su equilibrio entre ataque, defensa y resistencia.";

    }
    else if(cntr == 2){
        cntr = 0;
        document.getElementById("h1bu").innerHTML = "Informacion de venusaur";
        document.getElementById("p1bu").innerHTML = "Venusaur es un Pokémon de tipo Planta/Veneno introducido en la primera generación y la evolución final de Bulbasaur. Se caracteriza por la enorme flor que crece en su espalda, la cual florece completamente al absorber grandes cantidades de energía solar, otorgándole un poder considerable en combate. Gracias a esa energía, puede ejecutar ataques devastadores como Rayo Solar y Planta Feroz con gran eficacia. Venusaur destaca por su alta resistencia y buen equilibrio entre ataque y defensa, lo que lo convierte en un Pokémon muy sólido tanto para entrenadores principiantes como para estrategias competitivas más avanzadas.";
    
    }
}