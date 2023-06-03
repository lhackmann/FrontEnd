function atualizarPacientes() {
    const ul = document.getElementById('listaPacientes')
    ul.innerHTML = ''

const pacientes = fetch('http://localhost:3000/pacientes')
.then(resposta => resposta.json())
.then(pacientesDados => {
    pacientesDados.forEach(paciente =>{
        const li = document.createElement('li')
        li.innerText = `${paciente.prontuario} - ${paciente.nome} - ${paciente.dataNascimento} - ${paciente.cpf} - ${paciente.telefone}`
        
        // Botão deletar
        const btnDelete = document.createElement('button')
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click',() => deletarPaciente(paciente.prontuario))
        li.appendChild(btnDelete)
        
        
        const ul = document.getElementById('listaPacientes')
        ul.appendChild(li)
    })       
})
}

atualizarPacientes()

const formCadastro = document.getElementById('formCadastro')
formCadastro.addEventListener('submit',(event) => {
    event.preventDefault()
    cadastrarPaciente(event)
})

function cadastrarPaciente(form){
    const pacienteNovo = {
        prontuario: form.target.prontuario.value,
        nome: form.target.nome.value,
        dataNascimento: form.target.dataNascimento.value,
        cpf: form.target.cpf.value,
        telefone: form.target.telefone.value
    }
    fetch('http://localhost:3000/pacientes',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(pacienteNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar! Por favor inserir todos os dados validos.')
            return
        }

        alert('Cadastro com sucesso')
        atualizarPacientes()
    })
}

function deletarPaciente(id){
    fetch(`http://localhost:3000/pacientes/${id}`,{
        method : 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir')
        }
        atualizarPacientes()
    })
}




/*const outroP = document.createElement('p')
outroP.innerText = "Um p gerado por JS"
outroP.className = "textoVermelho"
document.body.appendChild(outroP)

const titulo = document.getElementById('titulo')
titulo.innerText = "H1 alterado pelo JS"*/

