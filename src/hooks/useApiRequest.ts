import toast from "react-hot-toast";

export const useApiRequest = async ({
  apiCall,
  isToastSuccess = false,
  isToastError = false,
  loadingType = "",
  setIsLoading,
  catchError = false,
}: {
  apiCall: Promise<any>;
  isToastSuccess?: boolean;
  isToastError?: boolean;
  loadingType?: string;
  setIsLoading?: (loadingType: string | null) => void;
  catchError?: boolean;
}) => {
  if (setIsLoading && loadingType) setIsLoading(loadingType);

  try {
    const response = await apiCall;
    if (response.status) {
      if (isToastSuccess) toast.success(response.data.message);
      return { data: response?.data || {}, status: true };
    }
  } catch (error: any) {
    if (catchError) return { data: error?.response?.data || {}, status: false };
    if (isToastError) toast.error(error.response.data.message);
  } finally {
    if (setIsLoading && loadingType) setIsLoading(null);
  }
};
