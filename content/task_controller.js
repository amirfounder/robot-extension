GET_ACCOUNT_RECOMMENDATIONS_FROM_ACCOUNT = 'get-acccount-reccomendations-from-account'
GET_HASHTAG_RECOMMENDATIONS = 'get-hashtag-recommendations'
GET_POSTS_FROM_ACCOUNT = 'get-posts-from-account'
GET_POSTS_FROM_HASHTAG = 'get-posts-from-hashtag'
LOGIN_TO_INSTAGRAM = 'login-to-instagram'
LOGIN_TO_GOOGLE = 'login-to-google'

const handleTaskRequest = async (messageData) => {
  const task = {
    [GET_ACCOUNT_RECOMMENDATIONS_FROM_ACCOUNT]: () => getAccountRecommendationsFromAccount(),
    [GET_HASHTAG_RECOMMENDATIONS]: () => getHashtagRecommendations(messageData?.startingHashtag),
    [GET_POSTS_FROM_ACCOUNT]: () => getPostsFromAccount(),
    [GET_POSTS_FROM_HASHTAG]: () => getPostsFromHashtag(),
    [LOGIN_TO_INSTAGRAM]: () => loginToInstagram(),
    [LOGIN_TO_GOOGLE]: () => loginToGoogle(),
  }[messageData?.name]

  if (task) { await task() }
}