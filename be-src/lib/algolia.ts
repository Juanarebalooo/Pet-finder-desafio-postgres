import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
dotenv.config();
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

const index = client.initIndex("pets");
export { index };
