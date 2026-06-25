import { User } from "./user";
import { Auth } from "./auth";
import { Pets } from "./pets";
User.hasMany(Pets);
Pets.belongsTo(User);

export { User, Auth, Pets };
