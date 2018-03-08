exports.responseOk = (response) => {
  response.status(200).send({success: true});
};