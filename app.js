
const content = document.getElementById("content");
const title = document.getElementById("page-title");

function pagina(nome) {
    const paginas = {
        home: ["Dashboard", `
            <h2>Bem-vindo ao CDF CYBER</h2>
            <div class="card-grid">
                <div class="card"><h3>Minha IDE</h3><p>Escreva e teste seus códigos.</p><button class="action" onclick="pagina('ide')">Abrir IDE</button></div>
                <div class="card"><h3>Python</h3><p>Aprenda programação desde o começo.</p><button class="action" onclick="pagina('python')">Estudar</button></div>
                <div class="card"><h3>JavaScript</h3><p>Crie aplicações e páginas.</p><button class="action" onclick="pagina('javascript')">Estudar</button></div>
                <div class="card"><h3>Cyber Lab</h3><p>Estude segurança digital.</p><button class="action" onclick="pagina('network')">Entrar</button></div>
            </div>
        `],

        ide: ["Minha IDE", `
            <div class="ide">
                <div class="ide-toolbar">
                    <select id="language" onchange="trocarModelo()">
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                        <option value="python">Python</option>
                    </select>
                    <button class="action" onclick="executar()">▶ Executar</button>
                    <button class="action" onclick="salvar()">Salvar</button>
                    <button class="action" onclick="baixar()">Baixar arquivo</button>
                    <button class="action" onclick="limpar()">Limpar</button>
                </div>
                <textarea id="editor" class="editor" spellcheck="false"></textarea>
                <div class="output" id="output">Terminal de saída pronto.</div>
            </div>
            <div class="panel">
                <h3>Visualização HTML</h3>
                <iframe class="preview" id="preview" sandbox="allow-scripts"></iframe>
            </div>
        `],

        python: ["Aprender Python", `
            <div class="panel">
                <h3>Aula 01 — Variáveis</h3>
                <p>Variáveis guardam informações.</p>
                <div class="lesson">
                    nome = "CDF CYBER"<br>
                    idade = 15<br>
                    print(nome)<br>
                    print(idade)
                </div>
                <h3>Aula 02 — Condições</h3>
                <div class="lesson">
                    idade = 18<br>
                    if idade >= 18:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("Maior de idade")<br>
                    else:<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;print("Menor de idade")
                </div>
                <button class="action" onclick="abrirAulaPython()">Praticar na IDE</button>
            </div>
        `],

        javascript: ["Aprender JavaScript", `
            <div class="panel">
                <h3>Aula 01 — Variáveis</h3>
                <div class="lesson">
                    let nome = "CDF";<br>
                    const linguagem = "JavaScript";<br>
                    console.log(nome);
                </div>
                <h3>O que estudar</h3>
                <p>Variáveis, funções, if, else, arrays e objetos.</p>
                <button class="action" onclick="pagina('ide')">Abrir editor</button>
            </div>
        `],

        web: ["HTML e CSS", `
            <div class="panel">
                <h3>Desenvolvimento Web</h3>
                <p>HTML estrutura a página. CSS controla o visual.</p>
                <div class="lesson">
                    &lt;h1&gt;Meu primeiro site&lt;/h1&gt;<br>
                    &lt;p&gt;Estou aprendendo programação&lt;/p&gt;
                </div>
                <button class="action" onclick="pagina('ide')">Abrir editor</button>
            </div>
        `],

        network: ["Análise de Rede", `
            <div class="panel">
                <h3>Validador de IP</h3>
                <p>Estude o formato de endereços IPv4.</p>
                <input id="ip" placeholder="192.168.1.10">
                <button class="action" onclick="validarIP()">Validar endereço</button>
                <p id="resultado"></p>
            </div>
            <div class="panel">
                <h3>Conceitos de rede</h3>
                <p>IP: identifica um dispositivo na rede.</p>
                <p>DNS: traduz nomes de domínio em endereços.</p>
                <p>Portas: identificam serviços de comunicação.</p>
            </div>
        `],

        security: ["Segurança Digital", `
            <div class="panel">
                <h3>Laboratório de segurança</h3>
                <p>Estude os seguintes assuntos:</p>
                <div class="lesson">01 — Segurança de aplicações web</div>
                <div class="lesson">02 — Autenticação e permissões</div>
                <div class="lesson">03 — Análise de vulnerabilidades</div>
                <div class="lesson">04 — Proteção de redes</div>
                <p>Use ambientes próprios e aplicações de treinamento autorizadas.</p>
            </div>
        `],

        projects: ["Projetos", `
            <div class="panel">
                <h3>Meus projetos</h3>
                <p>Use a IDE para escrever seus códigos e baixar os arquivos.</p>
                <button class="action" onclick="pagina('ide')">Novo projeto</button>
            </div>
        `],

        notes: ["Minhas anotações", `
            <div class="panel">
                <h3>Bloco de anotações</h3>
                <textarea id="notes" rows="12" placeholder="Escreva suas anotações..."></textarea>
                <button class="action" onclick="salvarNotas()">Guardar anotações</button>
                <p id="note-status"></p>
            </div>
        `]
    };

    if (!paginas[nome]) return;

    title.textContent = paginas[nome][0];
    content.innerHTML = paginas[nome][1];

    if (nome === "ide") {
        document.getElementById("editor").value =
            localStorage.getItem("cdf-code") ||
            'console.log("CDF CYBER iniciado!");';
    }

    if (nome === "notes") {
        document.getElementById("notes").value =
            localStorage.getItem("cdf-notes") || "";
    }
}

function trocarModelo() {
    const lang = document.getElementById("language").value;
    const modelos = {
        javascript: 'console.log("Olá, CDF CYBER!");',
        html: '<h1>Meu primeiro site</h1>\n<p>Olá, mundo!</p>',
        python: 'nome = "CDF CYBER"\nprint(nome)'
    };

    document.getElementById("editor").value = modelos[lang];
}

function executar() {
    const codigo = document.getElementById("editor").value;
    const linguagem = document.getElementById("language").value;
    const output = document.getElementById("output");

    if (linguagem === "javascript") {
        const iframe = document.getElementById("preview");
        const mensagem = document.createElement("script");
        const script = `
            const original = console.log;
            console.log = (...args) => {
                document.body.innerText += args.join(" ") + "\\n";
            };
            try {
                ${codigo}
            } catch (e) {
                document.body.innerText += "Erro: " + e.message;
            }
        `;

        iframe.srcdoc = `<body style="background:#080e18;color:#49b5ff;font-family:monospace;white-space:pre-wrap"></body><script>${script}<\/script>`;
        output.textContent = "JavaScript executado no ambiente isolado.";
    }

    if (linguagem === "html") {
        document.getElementById("preview").srcdoc = codigo;
        output.textContent = "Página HTML atualizada na visualização.";
    }

    if (linguagem === "python") {
        output.textContent =
            "O editor está pronto para Python, mas a execução real precisa de um interpretador Python conectado.";
    }
}

function salvar() {
    localStorage.setItem("cdf-code", document.getElementById("editor").value);
    document.getElementById("output").textContent =
        "Código salvo neste navegador!";
}

function baixar() {
    const linguagem = document.getElementById("language").value;
    const extensoes = {
        javascript: "js",
        html: "html",
        python: "py"
    };

    const blob = new Blob(
        [document.getElementById("editor").value],
        { type: "text/plain" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "projeto." + extensoes[linguagem];
    link.click();
    URL.revokeObjectURL(link.href);
}

function limpar() {
    document.getElementById("editor").value = "";
    document.getElementById("output").textContent = "Editor limpo.";
}

function abrirAulaPython() {
    pagina("ide");
    document.getElementById("language").value = "python";
    trocarModelo();
}

function validarIP() {
    const ip = document.getElementById("ip").value.trim();
    const partes = ip.split(".");

    const valido = partes.length === 4 &&
        partes.every(p => /^\d{1,3}$/.test(p) && Number(p) <= 255);

    document.getElementById("resultado").textContent =
        valido ? "Formato IPv4 válido!" : "Endereço inválido.";
}

function salvarNotas() {
    localStorage.setItem(
        "cdf-notes",
        document.getElementById("notes").value
    );

    document.getElementById("note-status").textContent =
        "Anotações guardadas!";
}

pagina("home");
