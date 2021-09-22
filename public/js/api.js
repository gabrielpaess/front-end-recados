const api = axios.create({
  baseURL: "https://back-end-recados.herokuapp.com",
});

function getApi(path, params, callback) {
  api
    .get(path, {
      params: params,
    })
    .then(function (response) {
      callback(response.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
}

function postApi(path, data, callback) {
  api
    .post(path, data)
    .then(function (response) {
      callback(response.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
}

function putApi(path, data, callback) {
  api
    .put(path, data)
    .then(function (response) {
      callback(response.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
}

function deleteApi(path, callback) {
  api
    .delete(path)
    .then(function (response) {
      callback(response.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
}
