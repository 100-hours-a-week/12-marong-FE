import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type CheckDuplicateData = {
  available: boolean;
  nickname?: string;
  groupName?: string;
  isFirstTime: boolean;
};

export const useCheckDuplicate = (query: UseMutationOptions) => {
  const { data, mutate: checkDuplicate, isSuccess } = useMutation(query);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setAvailable((data as CheckDuplicateData)?.available);
    }
  }, [isSuccess, data]);

  const reset = () => {
    setAvailable(null);
  };

  return { checkDuplicate, available, reset };
};
