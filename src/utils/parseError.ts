export const checkHasKeys = (data: Record<string, any>, keys: string[]) => {
  keys.forEach((key) => {
    if (data[key] !== undefined) return false;
  });

  return true;
};

export const parseErrorData = (errorData: any) => {
  let message;

  if (errorData?.responseData?.length) {
    const data = errorData?.responseData?.[0];

    if (checkHasKeys(data, ['field', 'message'])) {
      message = `field ${data.field} ${data.message}`;
    }
  } else {
    message =
      errorData?.message || 'Failed to proceed the actions, please try again';
  }

  return message;
};
