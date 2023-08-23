export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be must be from 1 to 100 characters',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password must be from 6 to 50 characters',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm Password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password must be from 6 to 50 characters',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Password confirm does not match password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_STRING: 'Bio must be a string',
  BIO_LENGTH: 'Bio length must be 1 from 200 characters',
  LOCATION_MUST_BE_STRING: 'Location must be a string',
  LOCATION_LENGTH: 'Location length must be 1 from 200 characters',
  WEBSITE_MUST_BE_STRING: 'website must be a string',
  WEBSITE_LENGTH: 'website length must be 1 from 200 characters',
  USERNAME_MUST_BE_STRING: 'username must be a string',
  USERNAME_INVALID:
    'Username must be 4-15 characters longg and contain only letters,numbers,underscores, not only numbers',
  AVATAR_MUST_BE_STRING: 'avatar must be a string',
  AVATAR_LENGTH: 'avartar length must be 1 from 400 characters',
  COVER_PHOTO_MUST_BE_STRING: 'cover photo must be a string',
  COVER_PHOTO_LENGTH: 'cover photo length must be 1 from 400 characters',
  UPDATE_ME_SUCCESS: 'Update my profile success',
  GET_PROFILE_SUCCESS: 'Get profile success',
  FOLLOW_SUCCESS: 'Follow success',
  INVALID_USER_ID: 'Invalid followed user id',
  FOLLOWED: 'Followed',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  USERNAME_EXISTED: 'Username already exists',
  OLD_PASSWORD_NOT_MATCH: 'old password not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  GMAIL_NOT_VERIFIED: 'email not verified',
  UPLOAD_SUCESS: 'Upload succesfully',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  GET_VIDEO_STATUS_SUCCESS: 'get video status success'
} as const
export const TWEETS_MESSAGES = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'parent id must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'content must be a non empty string',
  CONTENT_MUST_BE_EMPTY_STRING: 'content must be empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'media must be an array of media object',
  CREATE_TWEET_SUCCESS: 'create tweet successfully',
  BOOKMARK_TWEET_SUCCECSS: 'bookmark tweet successfully',
  UNBOOKMARK_TWEET_SUCCECSS: 'unbookmark tweet successfully'
} as const
