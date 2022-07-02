module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository
  const users = await userRepository.getAll(t)
  return users
}
