"use strict";
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CLASSES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
class ItemRelatorio {
    aeronave;
    quantidadeDeViagens;
    tempoTotalDeViagens;
    constructor(aeronave, quantidadeDeViagens, tempoTotalDeViagens) {
        this.aeronave = aeronave;
        this.quantidadeDeViagens = quantidadeDeViagens;
        this.tempoTotalDeViagens = tempoTotalDeViagens;
    }
}
class Relatorio {
    data_de_referencia;
    data_emissao;
    listaDeItemRelatorio = [];
    adicionarItemRelatorio(novo_item_do_relatorio) {
        this.listaDeItemRelatorio.push(novo_item_do_relatorio);
    }
}
function somar_tempo_das_viagens_de_uma_aeronave(lista_de_voos, aeronave) {
    let id_aeronave_buscada = aeronave.modelo + "-" + aeronave.marca;
    let tempo_em_minutos = 0;
    for (const voo_atual of lista_de_voos) {
        let id_aeronave_do_voo_atual = voo_atual.aeronave.modelo + "-" + voo_atual.aeronave.marca;
        if (id_aeronave_do_voo_atual == id_aeronave_buscada) {
            tempo_em_minutos += voo_atual.tempoPrevistoEmMinutos;
        }
    }
    return tempo_em_minutos;
}
function contar_numero_de_viagens_de_uma_aeronave(lista_de_voos, aeronave) {
    let id_aeronave_buscada = aeronave.modelo + "-" + aeronave.marca;
    let quantidade_de_viagens = 0;
    for (const voo_atual of lista_de_voos) {
        let id_aeronave_do_voo_atual = voo_atual.aeronave.modelo + "-" + voo_atual.aeronave.marca;
        if (id_aeronave_do_voo_atual == id_aeronave_buscada) {
            quantidade_de_viagens++;
        }
    }
    return quantidade_de_viagens;
}
document.addEventListener('DOMContentLoaded', () => {
    const cadrastro_voos = JSON.parse(localStorage.getItem('cadrastro_voos'));
    const cadrastro_aeronaves = JSON.parse(localStorage.getItem('cadrastro_aeronaves'));
    const alocacao_aeronave_voo = JSON.parse(localStorage.getItem('alocacao_aeronave_voo'));
    if (cadrastro_voos) {
        console.log(cadrastro_voos);
    }
    if (cadrastro_aeronaves) {
        // Exiba ou processe os dados das aeronaves na página
        console.log(cadrastro_aeronaves);
    }
    // Exiba ou processe os dados das aeronaves na página
    console.log(alocacao_aeronave_voo);
    let elemento_tabela_de_voos = document.getElementById("tabela_de_voos");
    let elemento_tbody_tabela_de_voos = document.getElementById("tbody_tabela_de_voos");
    console.log(elemento_tbody_tabela_de_voos);
    /*
    elemento_tbody_tabela_de_voos.children[1].children[0].innerText=5
    console.log(elemento_tbody_tabela_de_voos.children[1].children[0].innerText)
 */
    console.log(">>>>>>>>>>>Leitura dos TR da TBODY<<<<<<<<<");
    for (const elemento_atual of elemento_tbody_tabela_de_voos.children) {
        console.log(elemento_atual);
    }
    for (const voo_atual of alocacao_aeronave_voo) {
        const nova_linha_tabela = document.createElement("tr");
        const coluna_1 = document.createElement("td");
        coluna_1.innerText = voo_atual.rota;
        const coluna_2 = document.createElement("td");
        coluna_2.innerText = `${voo_atual.tempoPrevistoEmMinutos}`;
        const coluna_3 = document.createElement("td");
        coluna_3.innerText = voo_atual.aeronave.modelo + "-" + voo_atual.aeronave.marca;
        nova_linha_tabela.append(coluna_1);
        nova_linha_tabela.append(coluna_2);
        nova_linha_tabela.append(coluna_3);
        elemento_tbody_tabela_de_voos.append(nova_linha_tabela);
    }
    /*
        >>>>>>>>>>>>>>>RELATORIO <<<<<<<<<<<<<<

    */
    let elemento_tbody_tabela_relatorio_dos_voos = document.getElementById("tbody_tabela_relatorio_dos_voos");
    console.log(elemento_tbody_tabela_relatorio_dos_voos);
    let relatorio = new Relatorio();
    //Adicionando os items do relatorio
    for (const aeronave_atual of cadrastro_aeronaves) {
        let quantidade_de_viagens = contar_numero_de_viagens_de_uma_aeronave(cadrastro_voos, aeronave_atual);
        let tempo_total_das_viagens = somar_tempo_das_viagens_de_uma_aeronave(cadrastro_voos, aeronave_atual);
        //Criar objto que represetam um item do relatorio/uma linha da tabela
        let item_do_relatorio = new ItemRelatorio(aeronave_atual, quantidade_de_viagens, tempo_total_das_viagens);
        //Adicionar, ao Relatorio , um item do relatorio/uma linha da tabela 
        relatorio.adicionarItemRelatorio(item_do_relatorio);
    }
    //EXIBIR O RELATORIO DENTRO DA TABELA RELATORIO
    for (const item_do_relatorio of relatorio.listaDeItemRelatorio) {
        const nova_linha_tabela = document.createElement("tr");
        const coluna_1 = document.createElement("td");
        coluna_1.innerText = item_do_relatorio.aeronave.modelo + "-" + item_do_relatorio.aeronave.marca;
        const coluna_2 = document.createElement("td");
        coluna_2.innerText = `${item_do_relatorio.quantidadeDeViagens}`;
        const coluna_3 = document.createElement("td");
        coluna_3.innerText = `${item_do_relatorio.tempoTotalDeViagens}`;
        nova_linha_tabela.append(coluna_1);
        nova_linha_tabela.append(coluna_2);
        nova_linha_tabela.append(coluna_3);
        elemento_tbody_tabela_relatorio_dos_voos.append(nova_linha_tabela);
    }
});
