const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  let {title, techs, url} = request.body
  techs = Array.from(techs)
  const id = uuid();
  const likes = 0

  repositories.push(
    {
      id,
      title,
      techs,
      url,
      likes
    }
  );

  console.log(repositories)

  return response.json(
    {
      id,
      title,
      techs,
      url,
      likes
    }
  )


});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const index = repositories.findIndex(
    (value)=>{
      return value.id == id
    }
  );
  
  if (index < 0){
    console.log(index)
    return response.status(400).json({error: 'invalid id'})
  }

  const {title, url, techs} = request.body

  console.log(title, url, techs)

  const repository = repositories[index]

  console.log(repository)

  repository.title = title  
  repository.url = url
  repository.techs = techs

  console.log(repository)

  return response.json(repository)

});

app.delete("/repositories/:id", (req, res) => {
  // TODO
  const {id} = req.params;
  const index = repositories.findIndex(
    (value)=>{
      return value.id == id
    }
  );
  
  if (index < 0){
    console.log(index)
    return res.status(400).json({error: 'invalid id'})
  }

  let removed = repositories.splice(index,1)

  return res.status(204).json(removed)

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const {id} = request.params;
  const repository = repositories.find(
    (value)=>{
      return value.id == id
    }
  );
  
  if (repository == undefined){
    console.log(index)
    return response.status(400).json({error: 'invalid id'})
  }

  repository.likes++ 

  return response.json(repository)



});

module.exports = app;
