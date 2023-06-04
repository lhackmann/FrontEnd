function atualizarProfissionais(){
   const ul= document.getElementById('listaProfissionais')
    ul.innerHTML = ''

    const profissionais = fetch('http://localhost:3000/profissionais')
    .then(resposta => resposta.json())
    .then(profissionaisDados => {
        profissionaisDados.forEach(profissional => {
            const li = document.createElement('li')
            li.textContent = `${profissional.idProfissional} - ${profissional.nome} - ${profissional.cpf} - ${profissional.rg} - ${profissional.profissao} - ${profissional.ccr} - ${profissional.assinatura}`
            
            const btnDelete = document.createElement('button')
            btnDelete.innerText = "Remover"
            btnDelete.addEventListener('click', () => deletarProfissional(profissional.idProfissional))
            li.appendChild(btnDelete)

          const botaoAtualizar = document.createElement('button')
            botaoAtualizar.textContent = 'Atualizar'
            botaoAtualizar.className = 'btn btn-warning m-1'
            botaoAtualizar.addEventListener('click', () => showProfissional(profissional))

            const ul = document.getElementById('listaProfissionais')
            ul.appendChild(li)
        })
})
}

function showProfissional(profissional) {
    document.getElementById('idProfissionalUpdate').value = profissional.idProfissional
    document.getElementById('nomeUpdate').value = profissional.nome
    document.getElementById('cpfUpdate').value = profissional.cpf
    document.getElementById('rgUpdate').value = profissional.rg
    document.getElementById('profissaoUpdate').value = profissional.profissao
    document.getElementById('ccrUpdate').value = profissional.ccr
    document.getElementById('assinaturaUpdate').value = profissional.assinatura
}

function deletarProfissional(id) {
    fetch(`http://localhost:3000/profissionais/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if(resposta.status !=200){
            alert('Erro ao exluir profissional')
        }
        alert('Profissional excluído com sucesso')
       
    })
}

atualizarProfissionais()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarProfissional(event)
});

function cadastrarProfissional(form) {
    const Profissional = {
        idProfissional: form.target.idProfissional.value,
        nome: form.target.nome.value,
        CPF: form.target.cpf.value,
        RG: form.target.rg.value,
        profissao: form.target.profissao.value,
        CCR: form.target.ccr.value,
        assinatura: form.target.assinatura.value
    }

    fetch('http://localhost:3000/profissionais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Profissional)
    }).then(resposta => {
        if (resposta.status !=200 && resposta.status != 201) {
            alert('Erro ao cadastrar profissional!')
        }
        alert('Profissional cadastrado com sucesso!')
        form.target.reset()
        atualizarProfissionais()
    })

}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarProfissionais(event)
});

function atualizarProfissionais(form) {
    const profissional = {
        idProfissional: form.target.idProfissional.value,
        nome: form.target.nomeUpdate.value,
        CPF: form.target.cpfUpdate.value,
        RG: form.target.rgUpdate.value,
        profissao: form.target.profissaoUpdate.value,
        CCR: form.target.ccrUpdate.value,
        assinatura: form.target.assinaturaUpdate.value
    }

    fetch(`http://localhost:3000/profissionais/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(profissional)
    }).then(resposta => {
        if (resposta.status !=200) {
            alert('Erro ao atualizar profisisonal!')
        }
        alert('Profissional atualizado com sucesso!')
        form.target.reset()
        atualizarProfissionais()
        document.getElementById('btnUpdate').disabled = true
    })
}


/*const formCadastro = document.getElementById('formCadastro')
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
        profissao: form.target.profissao.value,
        ccr: form.target.ccr.value,
        assinatura: form.target.assinatura.value
    }
    fetch('http://localhost:3000/profissionais',{
        method: 'POST',
        headers: { 'Content-type' : 'application/json'},
        body: JSON.stringify(profissionalNovo)
    })
    .then(resposta => {
        if(resposta.status != 201){
            alert('Erro ao cadastrar! Por favor inserir todos os dados válidos!')
            return
        }

        alert('Cadastrado com sucesso!')
        atualizarProfissionais()
    })
}

function deletarProfissional(id){
    fetch(`http://localhost:3000/profissionais/${id}`,{
        method: 'DELETE'
    })
    .then(resposta => {
        if(resposta.status != 200){
            alert('Erro ao excluir!')
        }
        atualizarProfissionais()
    })
}//lucas */







/*function atualizarProfissionais() {
    const ul = document.getElementById('listaProfissionais')
    ul.innerHTML = ''

const profissionais = fetch('http://localhost:3000/profissionais')
.then(resposta => resposta.json())
.then(profissionaisDados => {
    profissionaisDados.forEach(profissional =>{
        const li = document.createElement('li')
        li.innerText = `${profissional.nome} - ${profissional.cpf} - ${profissional.rg} - ${profissional.profissao} - ${profissional.ccr} - ${profissional.assinatura}`
        
        // Botão deletar
        const btnDelete = document.createElement('button')
        btnDelete.innerText = "Remover"
        btnDelete.addEventListener('click',() => deletarProfissional(profissional.id))
        li.appendChild(btnDelete)
        
        
        const ul = document.getElementById('listaProfissionais')
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