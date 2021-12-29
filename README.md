<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


  <p align="center"> Groups dao project</p>
    <p align="center">

## Description
The project uses [dao clinet ](https://daostack.github.io/DAOstack-Hackers-Kit/)
Current version uses existing dao object for creating your own dao object you need to use 
daostack [migrations](https://daostack.github.io/DAOstack-Hackers-Kit/migration/)

There are different type of proposal. Proposal functions
1. [create proposal ](https://github.com/nairi-abgaryan/group-dao/blob/670ac02a049d128d3b5116c86f10b871c7450392/src/modules/group-dao/group-dao.service.ts#L63)
1. [Get proposal ](https://github.com/nairi-abgaryan/group-dao/blob/670ac02a049d128d3b5116c86f10b871c7450392/src/modules/group-dao/group-dao.service.ts#L102)
1. [Get proposals ](https://github.com/nairi-abgaryan/group-dao/blob/670ac02a049d128d3b5116c86f10b871c7450392/src/modules/group-dao/group-dao.service.ts#L115)

For finding proposal we use our db then doing request to client for each proposal. 
Good solution is using dao object  as discribed in here
```js
const showProposalDetails = async () => {
  const daos = await arc.daos().first()
  const dao = daos[0] // or the index of whichever DAO you are interested in
  const proposals = dao.proposals().subscribe(
    async (proposals) => {
      for (let proposal of proposals) {
        proposal.state().subscribe(
          (p) => console.log(p)
        )
      }
    })
}
```
## Installation
Before installing run dao client in your local computer 
```bash
$ git clone https://github.com/daostack/arc.js.git
$ cd arc.js
$ docker-compose up
```
After running dao client 
Create Database for groups dao project and setup .env variables
```bash
$ npm install 
$ ts-node node_modules/typeorm/cli.js migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


