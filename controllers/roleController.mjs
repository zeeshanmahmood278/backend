import ROLE from "../models/roleModel.mjs";

const getRoles = async (req, res, next) => {
  const documents = await ROLE.find({}, "_id name", {
    sort: { createdOn: -1 },
  });

  res.status(200).json(documents);
};

export default getRoles;
