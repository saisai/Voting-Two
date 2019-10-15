pragma solidity ^0.5.1;

contract Votes{
    // add candidates
    // add voters
    // vote for the candidates
    // display the total number of votes ganered by each candidate

    uint256 public candidateNumber = 0;
    uint256 public voterNumber = 0;

    struct Candidate{
        string name;
        string constituency;
        uint votesGanered;
    }

    struct Voter{
        string name;
        string constituency;
        bool voted;
    }

    mapping(uint256 => Candidate) public aspirant;
    mapping(uint256 => Voter) public voter;

    function add_candidate(string memory _name, string memory _constituency) public {
        candidateNumber += 1;
        aspirant[candidateNumber] = Candidate(_name, _constituency, 0);
    }

    function add_voter(string memory _name, string memory _constituency) public {
        voterNumber ++;
        voter[voterNumber] = Voter(_name, _constituency, false);
    }

    function vote() public {
        // Increase the votesGanered value by one
    }
}
