# 📚 Sistema Escolar — Backend

API REST do sistema escolar desenvolvido como projeto final do curso de Desenvolvimento de Sistemas do SENAI.

**Equipe:** Gustavo, Ana, Erick e Gabriel

---

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT (autenticação)
- Bcrypt (hash de senha)
- Zod (validação)
- Dotenv
- CORS

---

## 📁 Estrutura do projeto

```
backend/
├── src/
│   ├── controllers/
│   │   ├── attendanceController.js
│   │   ├── authController.js
│   │   ├── classController.js
│   │   ├── enrollmentController.js
│   │   ├── gradeController.js
│   │   ├── notificationController.js
│   │   ├── professorController.js
│   │   ├── studentController.js
│   │   └── userController.js
│   ├── database/
│   │   └── SqlConnection.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── Attendance.js
│   │   ├── Class.js
│   │   ├── Enrollment.js
│   │   ├── Grade.js
│   │   ├── GradeHistory.js
│   │   ├── Notification.js
│   │   ├── Professor.js
│   │   ├── Student.js
│   │   └── User.js
│   ├── routes/
│   │   ├── attendanceRoutes.js
│   │   ├── authRoutes.js
│   │   ├── classRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── gradeRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── professorRoutes.js
│   │   ├── studentRoutes.js
│   │   └── userRoutes.js
│   └── validators/
│       └── authValidator.js
├── app.js
├── .env
└── package.json
```

---

## ⚙️ Como rodar o projeto

**1. Clone o repositório:**
```bash
git clone https://github.com/seuusuario/FullStack.git
cd FullStack/backend
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Crie o banco de dados no MySQL:**
```sql
CREATE DATABASE sistema_escolar;
```

**4. Configure o arquivo `.env` na raiz do projeto:**
```env
PORT=3000
DBUSER=root
DBPASSWORD=suasenha
DB=sistema_escolar
JWT_SECRET=suachavesecreta
```

**5. Rode o servidor:**
```bash
npm run dev
```

Na primeira execução o sistema cria automaticamente um usuário admin:
```
✅ Admin inicial criado!
   Email: admin@admin.com
   Senha: Admin123
   ⚠️  Troque a senha após o primeiro login!
```

---

## 🔐 Autenticação

A API usa JWT. Após o login, inclua o token no header de todas as requisições protegidas:

```
Authorization: Bearer seutokenaqui
```

### Roles disponíveis

| Role | Permissões |
|------|-----------|
| `admin` | Acesso completo |
| `professor` | Ver alunos e turmas, lançar notas, registrar frequência |
| `aluno` | Ver suas turmas, notas e frequência |

---

## 📌 Rotas

### Auth
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | Cadastrar usuário | Admin |
| POST | `/auth/login` | Login | Não |

### Users
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| PUT | `/users/:id` | Atualizar perfil | Próprio usuário |

### Students
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/students` | Listar alunos | admin, professor |
| GET | `/students/:id` | Buscar aluno | admin, professor |
| PUT | `/students/:id` | Atualizar aluno | admin |
| DELETE | `/students/:id` | Deletar aluno | admin |

### Classes
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/classes` | Listar turmas | admin, professor, aluno |
| GET | `/classes/minhas` | Turmas do professor logado | professor |
| GET | `/classes/professores` | Listar professores | admin |
| GET | `/classes/:id` | Buscar turma | admin, professor, aluno |
| POST | `/classes` | Criar turma | admin |
| PUT | `/classes/:id` | Atualizar turma | admin |
| DELETE | `/classes/:id` | Deletar turma | admin |

### Enrollments
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/enrollments` | Listar matrículas | admin, professor |
| GET | `/enrollments/minhas` | Matrículas das turmas do professor | professor |
| GET | `/enrollments/aluno` | Matrículas do aluno logado | aluno |
| POST | `/enrollments` | Matricular aluno | admin |
| DELETE | `/enrollments/:id` | Remover matrícula | admin |

### Grades
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/grades` | Listar notas | admin, professor |
| GET | `/grades/:id` | Buscar nota | admin, professor |
| GET | `/grades/:id/history` | Histórico de alterações | admin, professor |
| GET | `/grades/student/:id` | Notas de um aluno | admin, professor, aluno |
| POST | `/grades` | Lançar nota | admin, professor |
| PUT | `/grades/:id` | Atualizar nota | admin, professor |
| DELETE | `/grades/:id` | Deletar nota | admin, professor |

### Attendances
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/attendances` | Frequência por turma e data | admin, professor |
| GET | `/attendances/student` | Frequência de um aluno | admin, professor, aluno |
| POST | `/attendances` | Registrar frequência | admin, professor |

### Notifications
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| GET | `/notifications` | Minhas notificações | todos |
| PUT | `/notifications/read` | Marcar todas como lidas | todos |
| PUT | `/notifications/:id/read` | Marcar uma como lida | todos |

### Professors
| Método | Rota | Descrição | Role |
|--------|------|-----------|------|
| PUT | `/professors/:id` | Atualizar professor | admin |
| DELETE | `/professors/:id` | Deletar professor | admin |

---

## 🗄️ Modelo do banco de dados

| Tabela | Descrição |
|--------|-----------|
| `users` | Todos os usuários do sistema |
| `students` | Perfil escolar dos alunos |
| `professors` | Perfil dos professores |
| `classes` | Turmas do sistema |
| `enrollments` | Matrículas de alunos em turmas |
| `grades` | Notas dos alunos por turma |
| `grade_history` | Histórico de alterações de notas |
| `attendances` | Frequência dos alunos por aula |
| `notifications` | Notificações dos usuários |

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Gustavo | Backend |
| Erick | Backend |
| Ana | Frontend |
| Gabriel | Frontend |