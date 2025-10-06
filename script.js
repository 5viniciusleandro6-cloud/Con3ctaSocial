// Dados dos cursos
const cursos = [
    {
        id: 1,
        titulo: "Desenvolvimento Web Frontend",
        area: "tecnologia",
        modalidade: "online",
        duracao: "80h",
        nivel: "iniciante",
        vagas: 50,
        descricao: "Aprenda HTML, CSS e JavaScript para criar sites modernos e responsivos.",
        conteudo: ["HTML5 e semântica", "CSS3 e Flexbox/Grid", "JavaScript básico", "Projetos práticos"],
        instrutor: "Prof. Ana Silva",
        certificacao: "Sim"
    },
    {
        id: 2,
        titulo: "Assistente Administrativo",
        area: "administracao",
        modalidade: "hibrido",
        duracao: "60h",
        nivel: "iniciante",
        vagas: 30,
        descricao: "Desenvolva habilidades essenciais para trabalhar na área administrativa.",
        conteudo: ["Rotinas administrativas", "Excel básico", "Atendimento ao cliente", "Organização de documentos"],
        instrutor: "Prof. Carlos Santos",
        certificacao: "Sim"
    },
    {
        id: 3,
        titulo: "Técnicas de Vendas",
        area: "vendas",
        modalidade: "presencial",
        duracao: "40h",
        nivel: "iniciante",
        vagas: 25,
        descricao: "Aprenda estratégias eficazes de vendas e relacionamento com clientes.",
        conteudo: ["Psicologia da venda", "Técnicas de abordagem", "Negociação", "Pós-venda"],
        instrutor: "Prof. Maria Oliveira",
        certificacao: "Sim"
    },
    {
        id: 4,
        titulo: "Cuidador de Idosos",
        area: "saude",
        modalidade: "hibrido",
        duracao: "120h",
        nivel: "iniciante",
        vagas: 20,
        descricao: "Capacitação completa para cuidar de pessoas idosas com segurança e carinho.",
        conteudo: ["Primeiros socorros", "Medicação", "Atividades terapêuticas", "Comunicação empática"],
        instrutor: "Enf. João Pereira",
        certificacao: "Sim"
    },
    {
        id: 5,
        titulo: "Auxiliar de Educação Infantil",
        area: "educacao",
        modalidade: "presencial",
        duracao: "100h",
        nivel: "iniciante",
        vagas: 15,
        descricao: "Prepare-se para trabalhar com crianças em creches e escolas.",
        conteudo: ["Desenvolvimento infantil", "Atividades lúdicas", "Primeiros socorros", "Legislação"],
        instrutor: "Prof. Lucia Costa",
        certificacao: "Sim"
    },
    {
        id: 6,
        titulo: "Empreendedorismo Digital",
        area: "empreendedorismo",
        modalidade: "online",
        duracao: "50h",
        nivel: "intermediario",
        vagas: 40,
        descricao: "Aprenda a criar e gerenciar seu próprio negócio online.",
        conteudo: ["Plano de negócios", "Marketing digital", "Redes sociais", "E-commerce"],
        instrutor: "Emp. Roberto Lima",
        certificacao: "Sim"
    }
];

let cursosExibidos = [...cursos];
let cursoAtual = null;

// Navegação
function showSection(sectionId) {
    const sections = ['sobre', 'cadastro', 'cursos'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (id === sectionId) {
            section.classList.remove('hidden');
            section.classList.add('fade-in');
        } else {
            section.classList.add('hidden');
        }
    });

    if (sectionId === 'cursos') {
        exibirCursos();
    }

    document.getElementById('mobileMenu').classList.add('hidden');
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// Cadastro
function handleCadastro(event) {
    event.preventDefault();
    const form = document.getElementById('cadastroForm');
    const successMessage = document.getElementById('successMessage');
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

// Cursos
function exibirCursos() {
    const container = document.getElementById('listaCursos');
    container.innerHTML = '';

    cursosExibidos.forEach(curso => {
        container.innerHTML += `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-gray-800">${curso.titulo}</h3>
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">${curso.area}</span>
                    </div>
                    <p class="text-gray-600 mb-4">${curso.descricao}</p>
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="mr-2">⏱️</span>
                            <span>${curso.duracao} • ${curso.modalidade}</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="mr-2">👥</span>
                            <span>${curso.vagas} vagas disponíveis</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                            <span class="mr-2">📊</span>
                            <span>Nível ${curso.nivel}</span>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="verDetalhes(${curso.id})" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                            Ver Detalhes
                        </button>
                        <button onclick="inscreverCurso(${curso.id})" class="bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            Inscrever-se
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filtrarCursos() {
    const area = document.getElementById('filtroArea').value;
    const modalidade = document.getElementById('filtroModalidade').value;
    const duracao = document.getElementById('filtroDuracao').value;
    const nivel = document.getElementById('filtroNivel').value;

    cursosExibidos = cursos.filter(curso => {
        let match = true;
        if (area && curso.area !== area) match = false;
        if (modalidade && curso.modalidade !== modalidade) match = false;
        if (nivel && curso.nivel !== nivel) match = false;

        if (duracao) {
            const horas = parseInt(curso.duracao);
            if (duracao === 'curta' && horas > 40) match = false;
            if (duracao === 'media' && (horas <= 40 || horas > 120)) match = false;
            if (duracao === 'longa' && horas <= 120) match = false;
        }
        return match;
    });

    exibirCursos();
}

function verDetalhes(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    cursoAtual = curso;
    document.getElementById('modalTitulo').textContent = curso.titulo;
    document.getElementById('modalConteudo').innerHTML = `
        <div class="space-y-4">
            <p class="text-gray-600">${curso.descricao}</p>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold text-gray-800 mb-2">Informações do Curso</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li><strong>Duração:</strong> ${curso.duracao}</li>
                        <li><strong>Modalidade:</strong> ${curso.modalidade}</li>
                        <li><strong>Nível:</strong> ${curso.nivel}</li>
                        <li><strong>Vagas:</strong> ${curso.vagas}</li>
                        <li><strong>Instrutor:</strong> ${curso.instrutor}</li>
                        <li><strong>Certificação:</strong> ${curso.certificacao}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-800 mb-2">Conteúdo Programático</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        ${curso.conteudo.map(item => `<li>• ${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('modalCurso').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modalCurso').classList.add('hidden');
}

function inscreverCurso(cursoId = null) {
    const curso = cursoId ? cursos.find(c => c.id === cursoId) : cursoAtual;
    alert(`🎉 Inscrição realizada com sucesso!\n\nCurso: ${curso.titulo}\n\nVocê receberá um email com as informações de acesso em breve.`);
    fecharModal();
}

document.addEventListener('DOMContentLoaded', () => showSection('sobre'));
