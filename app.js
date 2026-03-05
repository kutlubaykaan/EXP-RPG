let xp = 0;
let level = 1;
let tasks = [];

const xpYaz = document.getElementById("xp");
const levelYaz = document.getElementById("level");
const gorevListesi = document.getElementById("gorevListesi");


function gorevEkle(){

    const input = document.getElementById("gorevInput");
    const gorev = input.value;

    if(gorev === "") return;

    const task = {
        text:gorev,
        done:false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    goreviEkranaBas(task);
    input.value="";
}


function goreviEkranaBas(task){

    const div = document.createElement("div");
    div.classList.add("gorev");
    const span = document.createElement("span");
    span.textContent = task.text;
    const btn = document.createElement("button");
    btn.textContent = "Tamamla";
    if(task.done){
        div.classList.add("tamamlandi");
        btn.disabled = true;
    }

    btn.onclick = function(){

        if(task.done) return;
        task.done = true;
        div.classList.add("tamamlandi");
        btn.disabled = true;
        xpKazan();

        localStorage.setItem("tasks", JSON.stringify(tasks));

    }

    div.appendChild(span);
    div.appendChild(btn);

    gorevListesi.appendChild(div);

}


function xpKazan(){

    xp += 20;
    seviyeKontrolEt();
    guncellePanel();
    localStorage.setItem("xp", xp);
}


function seviyeKontrolEt(){

    if(xp >= 100){
        level++;
        xp = 0;
        localStorage.setItem("level", level);
    }

}


function guncellePanel(){
    xpYaz.textContent = xp;
    levelYaz.textContent = level;
}



window.onload = function(){

    const kayitliXP = localStorage.getItem("xp");
    const kayitliLevel = localStorage.getItem("level");
    const kayitliTasks = localStorage.getItem("tasks");
    if(kayitliXP){
        xp = Number(kayitliXP);
    }
    if(kayitliLevel){
        level = Number(kayitliLevel);
    }
    if(kayitliTasks){
        tasks = JSON.parse(kayitliTasks);
    }
   guncellePanel();

    tasks.forEach(function(task){

        goreviEkranaBas(task);

    });

}