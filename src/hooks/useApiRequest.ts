import toast from "react-hot-toast/headless";

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
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await apiCall;
    if (response.status) {
      if (isToastSuccess) toast.success(response.data.message);
      return response.data;
    }
  } catch (error: any) {
    if (catchError) return error.response.data;
    if (isToastError) toast.error(error.response.data.message);
    return;
  } finally {
    if (setIsLoading && loadingType) setIsLoading(null);
  }
};
