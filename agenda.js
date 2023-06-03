// Apenas cópia, deve atualizar
function atualizarProfissional(){
    document.getElementById('listaProfissional').innerHTML = ''
    const profissional = fetch('http://localhost:3000/profissional')
    .then(resposta => resposta.json())
    .then(profissional => {

        profissional.forEach(profissional => {
            const li = document.createElement('li')
            li.textContent = `${profissional.nome} - ${profissional.CPF} - ${profissional.RG} - ${profissional.profissao} - ${profissional.CCR} - ${profissional.assinatura}`
            const botaoExcluir = document.createElement('button')
            botaoExcluir.textContent = 'Excluir'
            botaoExcluir.className = 'btn btn-danger m-1'
            botaoExcluir.addEventListener('click', () => deleteProfissional(profissional.id))
            li.appendChild(botaoExcluir)

            const botaoAtualizar = document.createElement('button')
            botaoAtualizar.textContent = 'Atualizar'
            botaoAtualizar.className = 'btn btn-warning m-1'
            botaoAtualizar.addEventListener('click', () => showProfissional(profissional))

            document.getElementById('listaProfissional').appendChild(li)
        })
    })
}

function showProfissional(profissional) {
    document.getElementById('nomeUpdate').value = profissional.nome
    document.getElementById('CPFUpdate').value = profissional.CPF
    document.getElementById('RGUpdate').value = profissional.RG
    document.getElementById('profissaoUpdate').value = profissional.profissao
    document.getElementById('CCRUpdate').value = profissional.CCR
    document.getElementById('assinaturaUpdate').value = profissional.assinatura
}

function deleteProfissional(id) {
    fetch(`http://localhost:3000/profissional/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if(resposta.status !=200){
            alert('Erro ao exluir profissional')
        }
        alert('Profissional excluído com sucesso')
        atualizarProfissional()
    })
}

atualizarProfissional()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarProfissional(event)
});

function cadastrarProfissional(form) {
    const Profissional = {
        nome: form.target.nome.value,
        CPF: form.target.CPF.value,
        RG: form.target.RG.value,
        profissao: form.target.profissao.value,
        CCR: form.target.CCR.value,
        assinatura: form.target.assinatura.value
    }

    fetch('http://localhost:3000/profissional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profissional)
    }).then(resposta => {
        if (resposta.status !=200 && resposta.status != 201) {
            alert('Erro ao cadastrar profissional!')
        }
        alert('Profissional cadastrado com sucesso!')
        form.target.reset()
        atualizarProfissional()
    })

}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarProfissional(event)
});

function atualizarProfissional(form) {
    const profissional = {
        nome: form.target.nomeUpdate.value,
        CPF: form.target.CPFUpdate.value,
        RG: form.target.RGUpdate.value,
        profissao: form.target.profissaoUpdate.value,
        CCR: form.target.CCRUpdate.value,
        assinatura: form.target.assinatura.value
    }

    fetch(`http://localhost:3000/profissional/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(profissional)
    }).then(reposta => {
        if (resposta.status !=200) {
            alert('Erro ao atualizar profisisonal!')
        }
        alert('Profissional atualizado com sucesso!')
        form.target.reset()
        atualizarProfissional()
        document.getElementById('btnUpdate').disabled = true
    })
}