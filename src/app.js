App = {
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContracts()
        // await App.vote()
        await App.renderCandidates()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */ })
          } catch (error) {
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          App.web3Provider = web3.currentProvider
          window.web3 = new Web3(web3.currentProvider)
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      },

      loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        // console.log(App.account)
        $('#account').html('Address deployed to: ' + App.account)
      },

      loadContracts: async () => {
        const Voters_Contract = await $.getJSON('Votes.json')
        App.contracts.Main = TruffleContract(Voters_Contract)
        App.contracts.Main.setProvider(App.web3Provider)

        App.Voters_Contract = await App.contracts.Main.deployed()
        const Candidate_Count = await App.Voters_Contract.candidateNumber()
        // console.log(Candidate_Count)
      },

      addCandidate: async () => {
        const candidate_name = $('#add-name').val()
        // console.log(candidate_name)
        const candidate_constituency = $('#candidate_constituency').val()
        // console.log(candidate_constituency)

        await App.Voters_Contract.add_candidate(candidate_name, candidate_constituency);
        window.location.reload()
      },

      vote: async () => {
        //show the number of votes candidate one in the aspirant struct got
        App.aspirant = await App.Voters_Contract.aspirant(0)
        console.log(App.aspirant)
      },

      renderCandidates: async () => {
        const aspirant_Count = await App.Voters_Contract.candidateNumber()
        console.log(aspirant_Count)
        for(var i = 1; i<= aspirant_Count; i++){
          const candidate = await App.Voters_Contract.aspirant(i)
          const candidateName = candidate[0]
          const candidateConstituency = candidate[1]
          const candidateVotes = candidate[2]

          $('#candidateList').append(candidateName)
          console.log(candidateName)
        }
      }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
