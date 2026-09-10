````javascript
export default async function handler(req, res) {
    try {

        /*
         * =====================================================
         * CABULOSO NOTÍCIAS
         * API DE NOTÍCIAS + IA
         *
         * IMPORTANTE:
         * A chave da IA fica SOMENTE no servidor.
         * Nunca coloque sua chave no app.js.
         * =====================================================
         */


        // =====================================================
        // CONFIGURAÇÕES
        // =====================================================

        const OPENAI_API_KEY =
            process.env.OPENAI_API_KEY;


        if (!OPENAI_API_KEY) {

            return res.status(500).json({

                sucesso: false,

                erro:
                    "OPENAI_API_KEY não configurada na Vercel."

            });

        }


        // =====================================================
        // NOTÍCIA DE EXEMPLO
        //
        // Na próxima etapa vamos trocar isso pela captura
        // de uma fonte real.
        // =====================================================

        const tituloOriginal =
            "Cruzeiro se prepara para seu próximo compromisso";


        const informacaoOriginal =
            "O Cruzeiro segue trabalhando e se preparando para os próximos desafios da temporada.";


        // =====================================================
        // PROMPT DA IA
        // =====================================================

        const prompt = `

Você é um jornalista esportivo especializado em futebol brasileiro.

Crie uma reportagem ORIGINAL sobre o Cruzeiro usando
somente os fatos apresentados abaixo.

NÃO invente:
- jogadores
- resultados
- datas
- valores
- contratações
- declarações
- informações que não estejam na fonte.

NÃO copie frases da fonte.

Escreva com linguagem jornalística brasileira,
clara e natural.

Crie:

1. Título
2. Resumo
3. Reportagem com 4 a 6 parágrafos
4. Categoria
5. SEO title
6. Meta description

Título original:
${tituloOriginal}

Informação disponível:
${informacaoOriginal}

Retorne SOMENTE JSON neste formato:

{
    "titulo": "",
    "resumo": "",
    "categoria": "",
    "texto": [
        "",
        "",
        "",
        ""
    ],
    "seo_title": "",
    "meta_description": ""
}

`;


        // =====================================================
        // CHAMADA DA IA
        // =====================================================

        const resposta =
            await fetch(
                "https://api.openai.com/v1/chat/completions",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${OPENAI_API_KEY}`

                    },

                    body: JSON.stringify({

                        model: "gpt-4o-mini",

                        temperature: 0.4,

                        messages: [

                            {
                                role: "system",

                                content:
                                    "Você é um jornalista esportivo brasileiro."
                            },

                            {
                                role: "user",

                                content: prompt
                            }

                        ]

                    })

                }
            );


        if (!resposta.ok) {

            const erro =
                await resposta.text();

            return res.status(500).json({

                sucesso: false,

                erro:
                    "Erro ao consultar a IA.",

                detalhes:
                    erro

            });

        }


        // =====================================================
        // PROCESSAR RESPOSTA
        // =====================================================

        const dados =
            await resposta.json();


        const conteudo =
            dados.choices?.[0]?.message?.content;


        if (!conteudo) {

            return res.status(500).json({

                sucesso: false,

                erro:
                    "A IA não retornou conteúdo."

            });

        }


        // Remove possíveis blocos ```json
        const jsonLimpo =
            conteudo
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();


        const reportagem =
            JSON.parse(jsonLimpo);


        // =====================================================
        // RETORNO
        // =====================================================

        return res.status(200).json({

            sucesso: true,

            reportagem

        });


    } catch (erro) {

        console.error(
            "Erro API:",
            erro
        );


        return res.status(500).json({

            sucesso: false,

            erro:
                "Erro interno do servidor."

        });

    }
}
````
