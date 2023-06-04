function atualizarProfissionais() {
    const ul = document.getElementById('listaProfissionais')
    ul.innerHTML = ''

const profissionais = fetch('http://localhost:3000/profissional')
.then(resposta => resposta.json())
.then(profissionaisDados => {
    profissionaisDados.forEach(profissional =>{
        const li = document.createElement('li')
        li.innerText = `${profissional.idProfissional} - ${profissional.nome} - ${profissional.cpf} - ${profissional.rg} - ${profissional.profissao}- ${profissional.ccr}- ${profissional.assinatura}`
        
        // Botão deletar
        const btnDelete = document.createElement('button')
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click',() => deletarProfissional(profissional.idProfissional))
        li.appendChild(btnDelete)
        
        
        const ul = document.getElementById('listaProfissionais')
        ul.appendChild(li)
    })       
})
}

atualizarProfissionais()

const formCadastro = document.getElementById('formCadastro')
formCadastro.addEventListener('submit',(event) => {
    event.preventDefault()
    cadastrarProfissional(event)
})

function cadastrarProfissional(form){
    const profissionalNovo = {
        idProfissional: form.target.idProfissional.value,
        nome: form.target.nome.value,
        cpf: form.target.cpf.value,
        rg: form.target.rg.value,
        profissao: form.target.telefone.value,
        ccr: form.target.ccr.value,
        assinatura: form.target.assinatura.value
    }
    fetch('http://localhost:3000/profissionais',{
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(profissionalNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar! Por favor inserir todos os dados validos.')
            return
        }

        alert('Cadastro com sucesso')
        atualizarProfissionais()
    })
}

function deletarProfissional(id){
    fetch(`http://localhost:3000/profissional/${id}`,{
        method : 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir')
        }
        atualizarProfissionais()
    })
}




/*const outroP = document.createElement('p')
outroP.innerText = "Um p gerado por JS"
outroP.className = "textoVermelho"
document.body.appendChild(outroP)

const titulo = document.getElementById('titulo')
titulo.innerText = "H1 alterado pelo JS"*/

