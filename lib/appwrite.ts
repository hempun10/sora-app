import { LogBox } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.hem.sora",
  projectId: "665200eb002e81565eee",
  databaseId: "665201f9002608a51c48",
  userCollectionId: "6652024d003b5a73c9d2",
  videoCollectionId: "6652027b00184d6ac70c",
  storageId: "66520387003c145ce1de",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Failed to create user");
    }
    const avatarUrl = avatars.getInitials(username);
    const session = await signIn(email, password);
    if (!session) {
      throw new Error("Failed to create session");
    }
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    if (!newUser) {
      throw new Error("Failed to create user document");
    }
    return newUser;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    throw new Error(error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    //If previous session exists, delete it
    const doesSessionExist = await account.get();
    console.log(doesSessionExist);
    if (doesSessionExist) {
      await account
        .deleteSession(doesSessionExist.$id)
        .then(() => {
          console.log("Previous session deleted");
        })
        .catch((e) => {
          console.log(e);
          throw new Error("Failed to delete previous session");
        });
    }
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw Error;
    }
    return session;
  } catch (error) {
    console.log(error);
    //@ts-ignore
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
