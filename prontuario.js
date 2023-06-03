function atualizarProntuario() {
    const ul = document.getElementById('listaProntuarios')
    ul.innerHTML = ''

const prontuarios = fetch('http://localhost:3000/prontuarios')
.then(resposta => resposta.json())
.then(prontuariosDados => {
    prontuariosDados.forEach(prontuario =>{
        const li = document.createElement('li')
        li.innerText = `${prontuario.prontuario} - ${prontuario.nome}`
        
        // Botão deletar
        const btnDelete = document.createElement('button')
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click',() => deletarProntuario(prontuario.prontuario))
        li.appendChild(btnDelete)
        
        
        const ul = document.getElementById('listaProntuarios')
        ul.appendChild(li)
    })       
})
}

atualizarProntuarios()

const formCadastro = document.getElementById('formCadastro')
formCadastro.addEventListener('submit',(event) => {
    event.preventDefault()
    cadastrarProntuario(event)
})

function cadastrarProntuario(form){
    const prontuarioNovo = {
        prontuario: form.target.prontuario.value,
        nome: form.target.nome.value,
    }
    fetch('http://localhost:3000/prontuarios',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(prontuaioNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar! Por favor inserir todos os dados validos.')
            return
        }

        alert('Cadastro com sucesso')
        atualizarProntuarios()
    })
}

function deletarProntuario(id){
    fetch(`http://localhost:3000/prontuarios/${id}`,{
        method : 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir')
        }
        atualizarProntuarios()
    })
}




/*const outroP = document.createElement('p')
outroP.innerText = "Um p gerado por JS"
outroP.className = "textoVermelho"
document.body.appendChild(outroP)

const titulo = document.getElementById('titulo')
titulo.innerText = "H1 alterado pelo JS"*/

