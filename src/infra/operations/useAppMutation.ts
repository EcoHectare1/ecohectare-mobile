import { useMutation } from "@tanstack/react-query";

type UseAppMutationReturn<DataT, TVariables> = {
  mutate: (variable: TVariables) => void;
  isPending: boolean;
  error: unknown;
};

export type UseAppMutationOptions<TData, TVariables> = {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: unknown) => void;
};

type UseAppMutationParams<TData, TVariables> = {
  mutationFn: (variable: TVariables) => Promise<TData>;
} & UseAppMutationOptions<TData, TVariables>;

export function useAppMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
}: UseAppMutationParams<TData, TVariables>): UseAppMutationReturn<
  TData,
  TVariables
> {
  const { isPending, error, mutate } = useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError,
  });

  return {
    isPending,
    error,
    mutate,
  };
}
