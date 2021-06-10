
const trainers = [
  { id: '1', name: 'A', reputation: 4.5, places: 1, users: [] },
  { id: '2', name: 'B', reputation: 3.2, places: 4, users: [] },
  { id: '3', name: 'C', reputation: 1.2, places: 3, users: [] },
  { id: '4', name: 'D', reputation: 3.4, places: 2, users: [] },
]
const clients = [
  { id: '1', name: 'q', priority: 2.6 },
  { id: '2', name: 'r', priority: 3.7 },
  { id: '3', name: 's', priority: 8.5 },
  { id: '4', name: 't', priority: 9.5 },
  { id: '5', name: 'u', priority: 2.6 },
  { id: '6', name: 'v', priority: 4.7 },
  { id: '7', name: 'w', priority: 5.6 },
  { id: '8', name: 'x', priority: 3.7 },
  { id: '9', name: 'y', priority: 8.1 },
  { id: '10', name: 'z', priority: 2.5 },
]

async function getTrainers() {
  return trainers
}

async function getClients() {
  return clients
}

async function calculateClients(updatedTrainers) {
  let sortedClients = clients.sort((a, b) => b.priority - a.priority)
  let clientsCount = 0
  let sortedTrainers = updatedTrainers
    .sort((a, b) => b.reputation - a.reputation)
    .map((trainer) => {
      for (let index = 0; index < trainer.places; index++) {
        if (clientsCount < clients.length) {
          trainer.users[index] = sortedClients[clientsCount]
          clientsCount = clientsCount + 1
        }
      }
      trainer.places = trainer.places - trainer.users.length
      return trainer
    })

  return sortedTrainers
}

module.exports = {
  getTrainers,
  getClients,
  calculateClients,
}
