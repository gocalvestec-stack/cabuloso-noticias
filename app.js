```javascript
/* =========================================================
   CABULOSO NOTÍCIAS — APP.JS V1
   ========================================================= */


/* =========================================================
   DADOS DAS NOTÍCIAS
   ========================================================= */

const noticias = [

    {
        categoria: "CRUZEIRO",
        titulo: "Cruzeiro se prepara para mais um grande desafio",
        data: "Publicado agora",

        resumo:
            "Confira as principais informações do time celeste e tudo que movimenta o clube.",

        texto: [
            "O Cruzeiro segue trabalhando para os próximos compromissos da temporada. A equipe celeste mantém o foco nos treinamentos e na preparação para os desafios que estão pela frente.",

            "A comissão técnica trabalha para ajustar os detalhes necessários e buscar o melhor desempenho da equipe dentro de campo.",

            "A torcida acompanha de perto cada novidade e espera uma sequência positiva do time nos próximos jogos."
        ]
    },

    {
        categoria: "CAMPEONATO",
        titulo: "Raposa mira sequência positiva na competição",
        data: "Publicado hoje",

        resumo:
            "Veja as principais informações sobre a preparação do Cruzeiro.",

        texto: [
            "O Cruzeiro continua sua preparação para a sequência da temporada e busca manter uma boa regularidade nos próximos compromissos.",

            "O trabalho durante a semana é considerado importante para corrigir detalhes e preparar a equipe para o próximo adversário.",

            "A expectativa da torcida é de que o time consiga manter o bom desempenho."
        ]
    },

    {
        categoria: "BASTIDORES",
        titulo: "Bastidores do Cruzeiro movimentam a torcida",
        data: "Publicado hoje",

        resumo:
            "Confira as novidades que estão repercutindo entre os torcedores.",

        texto: [
            "Os bastidores do Cruzeiro continuam movimentados. As novidades envolvendo o clube chamam a atenção dos torcedores nas redes sociais.",

            "A equipe trabalha normalmente enquanto a diretoria acompanha as movimentações relacionadas ao futebol.",

            "Novas informações deverão surgir conforme os próximos compromissos se aproximam."
        ]
    },

    {
        categoria: "TORCIDA",
        titulo: "Torcida do Cruzeiro acompanha novidades",
        data: "Publicado hoje",

        resumo:
            "Torcedores acompanham de perto as informações do clube.",

        texto: [
            "A torcida do Cruzeiro segue acompanhando todas as novidades envolvendo o clube.",

            "Nas redes sociais, os torcedores comentam as principais informações e projetam os próximos jogos da equipe.",

            "O apoio da torcida continua sendo um dos destaques da temporada."
        ]
    }

];


/* =========================================================
   ELEMENTOS DA PÁGINA
   ========================================================= */

const modal = document.getElementById("modal");

const modalTitulo =
    modal.querySelector("h2");

const modalCategoria =
    modal.querySelector(".categoria");

const modalData =
    modal.querySelector(".data");

const modalTexto =
    modal.querySelector(".texto-reportagem");


/* =========================================================
   ABRIR NOTÍCIA
   ========================================================= */

function abrirNoticia(index = 0) {

    const noticia = noticias[index];

    if (!noticia) {
        return;
    }


    modalCategoria.textContent =
        noticia.categoria;


    modalTitulo.textContent =
        noticia.titulo;


    modalData.textContent =
        noticia.data;


    modalTexto.innerHTML = "";


    noticia.texto.forEach(paragrafo => {

        const p =
            document.createElement("p");

        p.textContent =
            paragrafo;

        modalTexto.appendChild(p);

    });


    modal.classList.add("ativo");


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   FECHAR NOTÍCIA
   ========================================================= */

function fecharNoticia() {

    modal.classList.remove("ativo");

    document.body.style.overflow =
        "";

}


/* =========================================================
   FECHAR CLICANDO FORA
   ========================================================= */

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        fecharNoticia();

    }

});


/* =========================================================
   FECHAR COM ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            fecharNoticia();

        }

    }
);


/* =========================================================
   CARREGAR NOTÍCIAS NOS CARDS
   ========================================================= */

function carregarNoticias() {

    const grid =
        document.querySelector(".noticias-grid");


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    noticias.forEach(
        (noticia, index) => {

            const card =
                document.createElement("article");

            card.className =
                "card-noticia";


            card.innerHTML = `

                <div class="card-imagem">
                    ⚽
                </div>

                <div class="card-conteudo">

                    <span class="categoria">
                        ${noticia.categoria}
                    </span>

                    <h3>
                        ${noticia.titulo}
                    </h3>

                    <p>
                        ${noticia.resumo}
                    </p>

                    <button
                        onclick="abrirNoticia(${index})">

                        Ler mais →

                    </button>

                </div>

            `;


            grid.appendChild(card);

        }
    );

}


/* =========================================================
   ATUALIZAR NOTÍCIA PRINCIPAL
   ========================================================= */

function carregarPrincipal() {

    const noticia =
        noticias[0];


    if (!noticia) {
        return;
    }


    const titulo =
        document.querySelector(
            ".noticia-principal h1"
        );


    const resumo =
        document.querySelector(
            ".noticia-principal p"
        );


    if (titulo) {

        titulo.textContent =
            noticia.titulo;

    }


    if (resumo) {

        resumo.textContent =
            noticia.resumo;

    }

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarNoticias();

        carregarPrincipal();

    }
);
```
