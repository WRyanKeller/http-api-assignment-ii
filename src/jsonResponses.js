const users = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  console.log(`respondJSON with ${object}`);

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  console.log("respondJSONMeta");

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, user) => {
  if (!user.name || !user.age) {
    const responseJSON = {
      message: 'Name and age are both required',
      id: 'addUserMissingParams'
    };
    return respondJSON(request, response, 400, responseJSON);
  }

  if (users[user.name]) {
    users[user.name] = user;
    return respondJSONMeta(request, response, 204);
  }
  
  users[user.name] = user;
  const responseJSON = {
    message: 'Created Successfully',
  };
  return respondJSON(request, response, 201, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound'
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notFound,
  notFoundMeta,
};