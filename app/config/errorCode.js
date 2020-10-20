const ErrorCode = {};
ErrorCode.serverError =
  "Sorry, something went wrong. We do not know what it is...";
ErrorCode.networkError = "Sorry, the network request failed...";

ErrorCode.invalidPassword = "Sorry, your password for this account is wrong...";
ErrorCode.userNotFound = "Sorry, no user is founded for this email...";

ErrorCode.requireCameraRollPermissions =
  "Sorry, we need camera roll permissions to make this work!";
ErrorCode.photoUploadFailed =
  "Sorry, there is currently something wrong with the firebase server...";

export default ErrorCode;
