function redirecionar_para_pagina_de_cadrastro(){
    window.location.href = 'cadrastro.html';
}

function redirecionar_para_pagina_de_relatorios_e_voos(){
    const cadrastro_voos:Voo[] = JSON.parse(localStorage.getItem('cadrastro_voos'));
    const cadrastro_aeronaves:Aeronave[]= JSON.parse(localStorage.getItem('cadrastro_aeronaves'));
    const alocacao_aeronave_voo:Voo[] = JSON.parse(localStorage.getItem('alocacao_aeronave_voo'));
    
    if (cadrastro_voos && cadrastro_aeronaves && alocacao_aeronave_voo ) {
        window.location.href = 'voos.html';
    }
    else{
        alert("Não há dados cadrastrados no sistema! Por favor,primeiramente,cadrastre os voos e aeronaves.")
    }
}








document.addEventListener('DOMContentLoaded',()=>{
    const cadrastro_voos:Voo[] = JSON.parse(localStorage.getItem('cadrastro_voos'));
    const cadrastro_aeronaves:Aeronave[]= JSON.parse(localStorage.getItem('cadrastro_aeronaves'));
    const alocacao_aeronave_voo:Voo[] = JSON.parse(localStorage.getItem('alocacao_aeronave_voo'));
    
    if (cadrastro_voos && cadrastro_aeronaves && alocacao_aeronave_voo ) {
        
    }

    

}
);