import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

type FetchFunction<T extends Models.Document> = () => Promise<T[]>;

const useAppwrite = <T extends Models.Document>(fn: FetchFunction<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fn]);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
