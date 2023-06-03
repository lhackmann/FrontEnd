function atualizarMedicacao(){
    document.getElementById('listaMedicacao').innerHTML = ''
    const medicacao = fetch('http://localhost:3000/medicacao')
    .then(resposta => resposta.json())
    .then(medicacao => {

        medicacao.forEach(medicacao => {
            const li = document.createElement('li')
            li.textContent = `${medicacao.medicacao} - ${medicacao.intensidade} - ${medicacao.posologia}`
            const botaoExcluir = document.createElement('button')
            botaoExcluir.textContent = 'Excluir'
            botaoExcluir.className = 'btn btn-danger m-1'
            botaoExcluir.addEventListener('click', () => deleteMedicacao(medicacao.id))
            li.appendChild(botaoExcluir)

            const botaoAtualizar = document.createElement('button')
            botaoAtualizar.textContent = 'Atualizar'
            botaoAtualizar.className = 'btn btn-warning m-1'
            botaoAtualizar.addEventListener('click', () => showMedicacao(medicacao))

            document.getElementById('listaMedicacao').appendChild(li)
        })
    })
}

function showMedicacao(medicacao) {
    document.getElementById('medicacaoUpdate').value = medicacao.medicacao
    document.getElementById('intensidadeUpdate').value = medicacao.intensidade
    document.getElementById('posologiaUpdate').value = medicacao.posologia
    }

function deleteMedicacao(id) {
    fetch(`http://localhost:3000/medicacao/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if(resposta.status !=200){
            alert('Erro ao exluir medicação')
        }
        alert('Medicação excluída com sucesso')
        atualizarMedicacao()
    })
}

atualizarMedicacao()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarMedicacao(event)
});

function cadastrarMedicacao(form) {
    const medicacao = {
        medicacao: form.target.medicacao.value,
        intensidade: form.target.intensidade.value,
        posologia: form.target.posologia.value,
            }

    fetch('http://localhost:3000/medicacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicacao)
    }).then(resposta => {
        if (resposta.status !=200 && resposta.status != 201) {
            alert('Erro ao cadastrar medicação!')
        }
        alert('Medicação cadastrado com sucesso!')
        form.target.reset()
        atualizarMedicacao()
    })

}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarMedicacao(event)
});

function atualizarMedicacao(form) {
    const medicacao = {
        medicacao: form.target.medicacaoUpdate.value,
        intensidade: form.target.intensidadeUpdate.value,
        posologia: form.target.posologiaUpdate.value,
            }

    fetch(`http://localhost:3000/medicacao/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(medicacao)
    }).then(reposta => {
        if (resposta.status !=200) {
            alert('Erro ao atualizar medicação!')
        }
        alert('Medicação atualizado com sucesso!')
        form.target.reset()
        atualizarMedicacao()
        document.getElementById('btnUpdate').disabled = true
    })
}