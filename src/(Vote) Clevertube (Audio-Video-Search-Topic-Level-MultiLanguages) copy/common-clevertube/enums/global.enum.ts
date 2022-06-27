export enum UserTypeKey {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum Action {
  MANAGE = 'manage',
  READ = 'read',
  WRITE = 'write',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}

// Constraint name for entity
export enum NameConstraintEntity {
  UQ_POLICIES = 'UQ_POLICIES',
  UQ_USER_HIGHLIGHT_WORDS = 'UQ_USER_HIGHLIGHT_WORDS',
  CHECK_USER_HIGHLIGHT_WORDS = 'CHECK_USER_HIGHLIGHT_WORDS',
}

export enum Resource {
  ALL = 'all',
  USER = 'user',
  ADMIN = 'admin',
  VIDEO = 'video',
  AUDIO = 'audio',
  TOPIC = 'topic',
  LEVEL = 'level'
}

export enum MediaType {
  VIDEO = 'video',
  AUDIO = 'audio',
}
