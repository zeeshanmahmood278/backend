import ACCOUNT from "../models/accountModel.mjs";
import ROLE from "../models/roleModel.mjs";
import { bcryptPasswordHashingService } from "../services/bcryptPasswordService.mjs";

const seedUsers = async () => {
  try {
    // 1. Fetch Role IDs
    const creatorRole = await ROLE.findOne({ name: "creator" });
    const userRole = await ROLE.findOne({ name: "user" });

    if (!creatorRole || !userRole) {
      console.log("Roles not found. Skipping user seeding.");
      return;
    }

    // 2. Define Default Users
    const defaultUsers = [
      {
        username: "CreatorUser",
        email: "creator@example.com",
        password: "Password@123", // You might want to use an env var or stronger default
        accountType: creatorRole._id,
      },
      {
        username: "StandardUser",
        email: "user@example.com",
        password: "Password@123",
        accountType: userRole._id,
      },
    ];

    for (const userData of defaultUsers) {
      // 3. Check if user exists
      const existingUser = await ACCOUNT.findOne({ email: userData.email });

      if (!existingUser) {
        // 4. Create User
        const hashedPassword = await bcryptPasswordHashingService(userData.password);
        const newAccount = new ACCOUNT({
          ...userData,
          password: hashedPassword,
        });
        
        const savedAccount = await newAccount.save();

        // 5. Update Role with User ID (as seen in accountController)
        await ROLE.findByIdAndUpdate(userData.accountType, {
          $push: { users: savedAccount._id },
        });

        console.log(`Seeded user: ${userData.username}`);
      } else {
        // console.log(`User already exists: ${userData.username}`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

export default seedUsers;
