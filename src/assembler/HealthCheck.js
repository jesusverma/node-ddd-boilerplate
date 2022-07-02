module.exports = async (repository) => {
  const { userRepository } = repository
  await userRepository.healthCheck()
  return true
}
