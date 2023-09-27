const buildFailure = async (message: string, statusCode: number) => {
  return {
    message,
    statusCode,
    status: "failure",
  };
};

const buildSuccess = async (message: string, statusCode: number, data: any) => {
  if (data) {
    return {
      message,
      statusCode,
      status: "success",
      data,
    };
  }
  return {
    message,
    statusCode,
    status: "success",
  };
};

export default { buildFailure, buildSuccess };
