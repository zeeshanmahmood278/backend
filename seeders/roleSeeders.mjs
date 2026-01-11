import ROLE from "../models/roleModel.mjs";
const roleSeeder = async () => {
  const defaultRoles = [
    {
      name: "creator",
    },
    {
      name: "user",
    },
  ];
  await ROLE.insertMany(defaultRoles);
};

export default roleSeeder;