````javascript
export default async function handler(req, res) {

    try {

        // =====================================================
        // 1. PEGAR A CHAVE DA OPENAI DA VERCEL
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
        // 2. RECEBER A INFORMAÇÃO DA NOTÍCIA
        // =====================================================

        const {
            titulo,
            resumo,
            fonte,
            url
        } = req.body || {};


        if (!titulo || !resumo) {

            return res.status(400).json({

                sucesso: false,

                erro:
                    "Título e resumo da notícia são obrigatórios."

            });

        }


        // =====================================================
        // 3. PROMPT PARA A IA
        // =====================================================

        const prompt = `

Você é um jornalista esportivo especializado no Cruzeiro.

Crie uma reportagem jornalística ORIGINAL a partir
das informações fornecidas.

REGRAS:

- Não copie frases da fonte.
- Não invente informações.
- Não invente jogadores.
- Não invente valores.
- Não invente datas.
- Não invente declarações.
- Não apresente rumores como fatos.
- Mantenha os fatos fornecidos.
- Escreva em português do Brasil.
- Use linguagem jornalística simples.
- Não diga que o texto foi "reescrito".
- Não finja ser o site oficial do Cruzeiro.
- A reportagem será publicada em um portal independente.

Crie:

TÍTULO
RESUMO
REPORTAGEM
CATEGORIA
SEO TITLE
META DESCRIPTION

Informações disponíveis:

Título:
${titulo}

Resumo:
${resumo}

Fonte:
${fonte || "Não informada"}

URL da fonte:
${url || "Não informada"}

Retorne SOMENTE JSON:

{
    "titulo": "",
    "resumo": "",
    "categoria": "Cruzeiro",
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
        // 4. ENVIAR PARA A OPENAI
        // =====================================================

        const resposta = await fetch(
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
                                "Você é um jornalista esportivo brasileiro especializado no Cruzeiro."
                        },

                        {
                            role: "user",

                            content: prompt
                        }

                    ]

                })

            }
        );


        // =====================================================
        // 5. VERIFICAR RESPOSTA
        // =====================================================

        if (!resposta.ok) {

            const erro =
                await resposta.text();

            return res.status(500).json({

                sucesso: false,

                erro:
                    "A OpenAI retornou um erro.",

                detalhes:
                    erro

            });

        }


        // =====================================================
        // 6. PEGAR RESPOSTA DA IA
        // =====================================================

        const dados =
            await resposta.json();


        const conteudo =
            dados
                .choices?.[0]
                ?.message
                ?.content;


        if (!conteudo) {

            return res.status(500).json({

                sucesso: false,

                erro:
                    "A IA não retornou uma reportagem."

            });

        }


        // =====================================================
        // 7. LIMPAR JSON
        // =====================================================

        const jsonLimpo =
            conteudo
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();


        const reportagem =
            JSON.parse(jsonLimpo);


        // =====================================================
        // 8. RETORNAR PARA O SITE
        // =====================================================

        return res.status(200).json({

            sucesso: true,

            fonte: {

                nome:
                    fonte || "",

                url:
                    url || ""

            },

            reportagem

        });


    } catch (erro) {

        console.error(
            "ERRO:",
            erro
        );


        return res.status(500).json({

            sucesso: false,

            erro:
                "Erro interno ao gerar reportagem.",

            detalhes:
                erro.message

        });

    }

}
````
