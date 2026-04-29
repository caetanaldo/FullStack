# 📚 Sistema Escolar — API REST

Backend de um sistema escolar desenvolvido como projeto final do curso de Desenvolvimento de Sistemas do SENAI.

*Equipe:* Gustavo, Ana, Erick e Gabriel

---

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT (autenticação)
- Bcrypt (hash de senha)
- Dotenv
- CORS

---

## 📁 Estrutura do projeto


FullStack/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── classController.js
│   │   ├── enrollmentController.js
│   │   ├── gradeController.js
│   │   └── studentController.js
│   ├── database/
│   │   └── SqlConnection.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Class.js
│   │   ├── Enrollment.js
│   │   ├── Grade.js
│   │   ├── Professor.js
│   │   ├── Student.js
│   │   └── User.js
│   └── routes/
│       ├── authRoutes.js
│       ├── classRoutes.js
│       ├── enrollmentRoutes.js
│       ├── gradeRoutes.js
│       └── studentRoutes.js
├── app.js
├── .env
└── package.json


---

## ⚙️ Como rodar o projeto

*1. Clone o repositório:*
bash
git clone https://github.com/seuusuario/FullStack.git
cd FullStack


*2. Instale as dependências:*
bash
npm install


*3. Crie o banco de dados no MySQL:*
sql
CREATE DATABASE sistema_escolar;


*4. Configure o arquivo .env na raiz do projeto:*
env
PORT=3000
DBUSER=root
DBPASSWORD=suasenha
DB=sistema_escolar
JWT_SECRET=suachavesecreta


*5. Rode o servidor:*
bash
npm run dev


---

## 🔐 Autenticação

A API usa JWT. Após o login, inclua o token no header de todas as requisições protegidas:


Authorization: Bearer seutokenaqui


### Roles disponíveis

| Role | Permissões |
|------|-----------|
| admin | Acesso completo |
| professor | Ver alunos, turmas e lançar notas |
| aluno | Ver suas turmas e notas |

---

## 📌 Rotas

### Auth
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|-------------|
| POST | /auth/register | Cadastrar usuário | Não |
| POST | /auth/login | Login | Não |

### Students
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | /students | Listar alunos | admin, professor |
| GET | /students/:id | Buscar aluno por id | admin, professor |
| PUT | /students/:id | Atualizar aluno | admin |
| DELETE | /students/:id | Deletar aluno | admin |

### Classes
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | /classes | Listar turmas | admin, professor, aluno |
| GET | /classes/:id | Buscar turma por id | admin, professor, aluno |
| GET | /classes/professores | Listar professores | admin |
| POST | /classes | Criar turma | admin |
| PUT | /classes/:id | Atualizar turma | admin |
| DELETE | /classes/:id | Deletar turma | admin |

### Enrollments
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | /enrollments | Listar matrículas | admin, professor |
| GET | /enrollments/:id | Buscar matrícula por id | admin, professor |
| POST | /enrollments | Matricular aluno | admin |
| DELETE | /enrollments/:id | Remover matrícula | admin |

### Grades
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | /grades | Listar notas | admin, professor |
| GET | /grades/:id | Buscar nota por id | admin, professor |
| GET | /grades/student/:student_id | Notas de um aluno | admin, professor, aluno |
| POST | /grades | Lançar nota | admin, professor |
| PUT | /grades/:id | Atualizar nota | admin, professor |
| DELETE | /grades/:id | Deletar nota | admin |

---

## 🗄️ Modelo do banco de dados

| Tabela | Descrição |
|--------|-----------|
| users | Todos os usuários do sistema |
| students | Perfil escolar dos alunos |
| professors | Perfil dos professores |
| classes | Turmas do sistema |
| enrollments | Matrículas de alunos em turmas |
| grades | Notas dos alunos por turma |

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Erick | Backend |
| Gustavo | Frontend |
| Ana | Frontend |
| Gabriel | Frontend |