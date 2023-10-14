/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CLASSES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


class Aeronave{
    id:string
    modelo:string
    marca:string
    constructor(modelo:string,marca:string){
        this.modelo=modelo
        this.marca=marca
        
        this.id=modelo+"-"+marca
    }
}

class Voo{
    rota:string
    tempoPrevistoEmMinutos:number
    aeronave:Aeronave

    constructor(rota:string, tempoPrevistoEmMinutos:number){
        this.rota=rota
        this.tempoPrevistoEmMinutos=tempoPrevistoEmMinutos
    }

}



/*>>>>>>>>>>>############# FUNCOES AUXILIARES ##############<<<<<<<<<<<<<<<<<<<<<<<*/

function verificar_se_um_caractere_eh_um_numero(caractere:string){
    let lista_de_caracteres_numericos=[0,1,2,3,4,5,6,7,8,9]

    if(lista_de_caracteres_numericos.includes(Number(caractere)) && (caractere!="" &&  caractere!=" ")){
        return true
    }
    return false
}

function separar_itens_do_campo_cadrastro_voos_V2(valor_do_campo_cadrastro_voos: string): Voo[] {
    let lista_de_voos: string[] = [];
    let lista_de_voos_apos_validacao: string[]=[]

    //a lista de voos irá receber os objtos da classe Voo
    let lista_de_voos_final:Voo[]=[]

    let posicao_inicial_do_item_atual = 0;
    let posicao_final_do_item_atual = 0;

    for (let indice_atual = 0; indice_atual < valor_do_campo_cadrastro_voos.length; indice_atual++) {
        if (verificar_se_um_caractere_eh_um_numero(valor_do_campo_cadrastro_voos[indice_atual])) {
            let posicao = indice_atual;
            while (posicao < valor_do_campo_cadrastro_voos.length && verificar_se_um_caractere_eh_um_numero(`${valor_do_campo_cadrastro_voos[posicao]}`)) {
                posicao++;
            }

            // A posição guarda a posição atual que representa a posição final do item atual
            posicao_final_do_item_atual = posicao - 1;

            lista_de_voos.push(valor_do_campo_cadrastro_voos.substring(posicao_inicial_do_item_atual, posicao_final_do_item_atual + 1));

            // Atualiza a posição inicial para a próxima iteração
            posicao_inicial_do_item_atual = posicao;
        }
    }

    //Verificar e remover posicoes vazias ""
    for (const voo_atual of lista_de_voos) {
        if(voo_atual!=""){
            lista_de_voos_apos_validacao.push(voo_atual)
        }
    }

    //Verificar e remover "\n" dos items
    for (let indice_atual = 0; indice_atual < lista_de_voos_apos_validacao.length; indice_atual++) {
        //ultima posicao da string atual
        let ultima_posicao=lista_de_voos_apos_validacao[indice_atual].length-1
        //verifica se o valor da ultima posicao da string  atual é "\n"
        if(lista_de_voos_apos_validacao[indice_atual] [ultima_posicao] == "\n"){
            lista_de_voos_apos_validacao[indice_atual]=lista_de_voos_apos_validacao[indice_atual].substring(0,lista_de_voos_apos_validacao[indice_atual].length-1)
        }
    }


    //Criar os objetos que reprsentam os Voos
    for (const voo_atual of lista_de_voos_apos_validacao) {
        const separacao_dos_destalhes_do_voo_atual: string[]=voo_atual.split(";")
        const rota_voo_atual=separacao_dos_destalhes_do_voo_atual[0]
        const tempo_previsto_em_minutos=separacao_dos_destalhes_do_voo_atual[1]
        const objeto_voo_atual=new Voo(rota_voo_atual,Number(tempo_previsto_em_minutos))
        lista_de_voos_final.push(objeto_voo_atual)
        

    }

    return lista_de_voos_final;
}

function separar_itens_do_campo_cadrastro_aeronaves(valor_do_campo_de_cadrastro_das_aeronaves:string){
    let lista_de_aeronaves: string[] = [];
    let lista_de_aeronaves_apos_validacao: string[]=[]

    //a lista de voos irá receber os objtos da classe Voo
    let lista_de_aeronaves_final:Aeronave[]=[] 

    let regex=/[\n\s]+/
    lista_de_aeronaves=valor_do_campo_de_cadrastro_das_aeronaves.split(regex)


    //verificar se há itens com valor de espacos vazios/string vazia  ""
    for (const aeronave_atual of lista_de_aeronaves) {
        if(aeronave_atual!=""){
            lista_de_aeronaves_apos_validacao.push(aeronave_atual)
        }
    }

    //criar os objetos que representam as aeronaves
    for (const aeronave_atual of lista_de_aeronaves_apos_validacao) {
        let destalhes_da_aeronave_atual=aeronave_atual.split("-")
        let aeronave_modelo_aeronave_atual=destalhes_da_aeronave_atual[0]
        let aeronave_marca_aeronave_atual=destalhes_da_aeronave_atual[1]
        let objeto_aeronave_atual=new Aeronave(aeronave_modelo_aeronave_atual,aeronave_marca_aeronave_atual)
        lista_de_aeronaves_final.push(objeto_aeronave_atual)
    }

    return lista_de_aeronaves_final
}
  
function alocar__randomicamente_as_aeronaves_para_os_voos(lista_de_voos:Voo[],lista_de_aeronaves:Aeronave[]): Voo[]{
    let lista_de_voos_com_as_aeronaves_alocadas:Voo[]=lista_de_voos

    let numero_aleatorio_maximo=lista_de_aeronaves.length
    /*o numero minimo por padrao eh zero,sera gerado valores inteiros entre 0 e a ultima posicao da lista
        ou seja, 0 <= x < numero_aleatorio_maximo
    */
    
    for (let indice_atual = 0; indice_atual < lista_de_voos_com_as_aeronaves_alocadas.length; indice_atual++) {
        const indice_aleatorio=Math.floor(Math.random() * numero_aleatorio_maximo);
        lista_de_voos_com_as_aeronaves_alocadas[indice_atual].aeronave=lista_de_aeronaves[indice_aleatorio]
    }

    return lista_de_voos_com_as_aeronaves_alocadas
}

function validar_textArea_cadrastro_voos(valor_textArea_cadrastro_voo:string){
    let regex=/^(\s*[^;]+\s*[xX]\s*[^;]+;\s*[0-9]+\s*)+(\r?\n|$)/
    return regex.test(valor_textArea_cadrastro_voo)
}

function validar_textArea_cadrastro_aeronaves(valor_textArea_cadrastro_aeronaves:string){
    const regex = /^(?:[A-Z0-9]+-[A-Z0-9]+\s*)+$/;
    return regex.test(valor_textArea_cadrastro_aeronaves);
}

/*>>>>>>>>>>>>>>>>>>>>>>> @@@@@@ NAVEGACAO ENTRE PAGINAS @@@@@<<<<<<<<<<<<<<<<<<<<<<*/

function redircionar_para_a_pagina_voos(){
    location.assign("http://localhost:5500/voos.html")
}


/*>>>>>>>>>>>>>>>>>>>>>>> ############ ARMAZENAR OS CADRASTROS #############<<<<<<<<<<<<<<<<<<<<<<*/
function armazenar_os_dados_cadrastrados(lista_de_voos:Voo[],lista_de_aeronaves:Aeronave[],alocacao_aeronave_voo:Voo[]){
    localStorage.removeItem('cadrastro_voos')
    localStorage.removeItem('cadrastro_aeronaves')
    localStorage.removeItem('alocacao_aeronave_voo')

    localStorage.setItem('cadrastro_voos', JSON.stringify(lista_de_voos));
    localStorage.setItem('cadrastro_aeronaves', JSON.stringify(lista_de_aeronaves));
    localStorage.setItem('alocacao_aeronave_voo', JSON.stringify(alocacao_aeronave_voo));
    
}


function personalizar_as_mensagens_de_campo_invalido_do_formulario(){
    let campo_textArea_voos=document.getElementById("campo_de_cadrastro_dos_voos")
    let campo_textArea_aeronaves=document.getElementById("campo_de_cadrastro_das_aeronaves")

    if(campo_textArea_voos.validity.valueMissing && campo_textArea_aeronaves.validity.valueMissing==false){
        campo_textArea_voos.setCustomValidity(`Exemplo: Rio de Janeiro x São Paulo ; 50`);
        campo_textArea_voos.focus()
    }
    else if(campo_textArea_voos.validity.valueMissing==false && campo_textArea_aeronaves.validity.valueMissing){
        campo_textArea_aeronaves.setCustomValidity(`Exemplo: AER002-BOING`);
        campo_textArea_aeronaves.focus()
    }
    else if(campo_textArea_voos.validity.valueMissing && campo_textArea_aeronaves.validity.valueMissing){
        alert("Os campos cadrastro de voos e cadrastro de aeronaves contém valores inválidos!")
        campo_textArea_voos.setCustomValidity(`Exemplo: Rio de Janeiro x São Paulo ; 50`);
        campo_textArea_voos.focus()
    }
    else{
        campo_textArea_voos.setCustomValidity("");
        campo_textArea_aeronaves.setCustomValidity("");
    }

    campo_textArea_voos.reportValidity();
    campo_textArea_aeronaves.reportValidity();
}

/*>>>>>>>>>>>>>>>>>>>>>>>#############
            _______________________________________________________________________
            |FUNCAO DE CADRASTRO DE VOOS E AERONAVES (FUNCAO PRINCIPAL DO PROGRAMA)|
            |______________________________________________________________________|
            
<<<<<<<<<<<<<<<<<<<<<<###############*/

function cadrastrar_dados(){
    let formulario=document.getElementById("formulario_de_cadrastro_voos_e_aeronaves")
    formulario.addEventListener('submit',(e:Event)=>
    {
            e.preventDefault()
  
            let campo_textArea_voos=document.getElementById("campo_de_cadrastro_dos_voos")
            let campo_textArea_aeronaves=document.getElementById("campo_de_cadrastro_das_aeronaves")
            //VALIDACAO DOS CAMPOS
            let valor_textArea_voos_eh_valido=validar_textArea_cadrastro_voos(campo_textArea_voos.value)
            let valor_textArea_aeronaves_eh_valido=validar_textArea_cadrastro_aeronaves(campo_textArea_aeronaves.value)

           if(valor_textArea_voos_eh_valido && valor_textArea_aeronaves_eh_valido){

                        let lista_de_voos_cadrastrados: Voo[]=[]
                        let lista_de_aeronaves_cadrastradas: Aeronave[]=[]

                        lista_de_voos_cadrastrados=separar_itens_do_campo_cadrastro_voos_V2(campo_textArea_voos.value)

                        lista_de_aeronaves_cadrastradas=separar_itens_do_campo_cadrastro_aeronaves(campo_textArea_aeronaves.value)

                        let alocacao_aeronave_voo=alocar__randomicamente_as_aeronaves_para_os_voos(lista_de_voos_cadrastrados,lista_de_aeronaves_cadrastradas)

                        // adicionando os dados do cadrastro ao LocalStorage para serem acessados na pagina voos.html
                        armazenar_os_dados_cadrastrados(lista_de_voos_cadrastrados,lista_de_aeronaves_cadrastradas,alocacao_aeronave_voo)

                        redircionar_para_a_pagina_voos()
            }

            else if(valor_textArea_voos_eh_valido && valor_textArea_aeronaves_eh_valido==false){
                alert("O Campo de cadrastro de aeronaves não está em um formato válido! Por favor,verifique se o valor digitado está conforme ao padrão esperado pelo campo.")
                campo_textArea_aeronaves.focus()
                
            }

            else if(valor_textArea_voos_eh_valido==false && valor_textArea_aeronaves_eh_valido){
                alert("O Campo de cadrastro de voos não está em um formato válido! Por favor,verifique se o valor digitado está conforme ao padrão esperado pelo campo.")
                campo_textArea_voos.focus()
            }

            else{
                alert("Os Campos de cadrastro de voos e cadrastro de aeronaves não estão em um formato válido! Por favor,verifique se o valor digitado está conforme ao padrão esperado pelo campo.")
                campo_textArea_voos.focus()
                
            }

            campo_textArea_voos.reportValidity();

        console.log("super!!!")
    }
   )


   personalizar_as_mensagens_de_campo_invalido_do_formulario()
    
}

